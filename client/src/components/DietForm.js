import React, { useState } from 'react'
import { useHistory, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/DietForm.css'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function DietForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState({ display: 'none' });
  const [calorieGoals, setCalorieGoals] = useState('');
  const [proteinGoals, setProteinGoals] = useState('');
  const [carbGoals, setCarbGoals] = useState('');
  const [fatGoals, setFatGoals] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  //create amount of meals per day
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleMealsPerDayChange = (e) => {
    setMealsPerDay(e.target.value);
  };

  const handleDaySelection = (e) => {
    const value = e.target.value;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleProteinGoalsChange = (e) => {
    setProteinGoals(e.target.value);
  };

  const handleCarbGoalsChange = (e) => {
    setCarbGoals(e.target.value);
  };

  const handleFatGoalsChange = (e) => {
    setFatGoals(e.target.value);
  };


  const handleCalorieGoalsChange = (e) => {
    setCalorieGoals(e.target.value);
  };

  const handleFitnessLevelChange = (e) => {
    setFitnessLevel(e.target.value);
  };


  const handleEquipmentAvailable = (e) => {
    setEquipmentAvailable(e.target.value);
  };

  const handleDietaryRestrictions = (e) => {
    setDietaryRestrictions(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };


  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='dietForm-input-form'>
            <label>
              <h1 className='dietForm-form-title'>What is your daily calorie goal?</h1>
              <input className='dietForm-input-textbox' type="text" name="calorieGoals" value={calorieGoals} onChange={handleCalorieGoalsChange} /> g
            </label>
          </div>
        );
      case 2:
        return (
          <div className='dietForm-input-form'>
            <label>
              <h1 className='dietForm-form-title'>What is your daily protein requirement?</h1>
              <input className='dietForm-input-textbox' type="text" name="proteinGoals" value={proteinGoals} onChange={handleProteinGoalsChange} /> g
            </label>
          </div>
        );
      case 3:
        return (
          <div className='dietForm-input-form'>
            <label>
              <h1 className='dietForm-form-title'>What is your daily carb requirement?</h1>
              <input className='dietForm-input-textbox' type="text" name="carbGoals" value={carbGoals} onChange={handleCarbGoalsChange} /> g
            </label>
          </div>
        );
      case 4:
        return (
          <div className='dietForm-input-form'>
            <label>
              <h1 className='dietForm-form-title'>What is your daily fat requirement?</h1>
              <input className='dietForm-input-textbox' type="text" name="fatGoals" value={fatGoals} onChange={handleFatGoalsChange} /> g
            </label>
          </div>
        );
      case 5:
        return (
          <div className='dietForm-input-form'>
            <label>
              <h1 className='dietForm-form-title'>Do you have any food allergies or dietary restrictions?</h1>
              <input className='dietForm-input-textbox diet-form-input-allergy' type="text" name="dietaryRestrictions" value={dietaryRestrictions} onChange={handleDietaryRestrictions} />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      calorieGoals,
      proteinGoals,
      carbGoals,
      fatGoals,
      mealsPerDay
      // Other form fields...
    };
    // You can perform any further processing or data handling here
    setIsLoading({ display: 'block' });
    try {
      const response = await axios.post('/api/nutrition/generate-plan', formData);
      console.log('Response from API:', response.data.dietPlan);
      // Handle the response as needed
      navigate('/app/dietPlan', { state: { completionResult: response.data.dietPlan } });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    } finally {
      setIsLoading({ display: 'none' });
    }
    console.log(calorieGoals, fitnessLevel, selectedDays, equipmentAvailable);
    console.log('Form submitted!');
    console.log('loading...')
  };

  return (
    <div id="dietForm-body-container">
      <div id="dietForm-title-container">
        <Link to="/app/nutrition" className="diet-back-button-link">
          <p className='diet-back-button'>&#60; Go Back</p>
        </Link>
        <h1 id="dietForm-title-title">Diet</h1>
        <p id="dietForm-title-subtext">Generate Diet Plan</p>
      </div>
      <form id="dietForm-form" onSubmit={handleSubmit}>
        {renderStep()}
        <div id='fitForm-button-container'>
          {step > 1 && <button id='dietForm-back-button' onClick={handlePrev} type="button">Back</button>}
          {step < 6 ? (
            <button id='dietForm-next-button' onClick={handleNext} type="button">Next</button>
          ) : (
            <button id='fitFormdietFormsubmit-button' onClick={handleSubmit} type="submit">Submit</button>
          )}
        </div>
        {/* <div className='dietForm-input-form'>
          <label>
            <h1 className='dietForm-form-title'>What is your daily protein requirement?</h1>
            <input className='dietForm-input-textbox' type="text" name="proteinGoals" value={proteinGoals} onChange={handleProteinGoalsChange} /> g
          </label>
        </div>

        <div className='dietForm-input-form'>
          <label>
            <h1 className='dietForm-form-title'>What is your daily carb requirement?</h1>
            <input className='dietForm-input-textbox' type="text" name="carbGoals" value={carbGoals} onChange={handleCarbGoalsChange} /> g
          </label>
        </div>

        <div className='dietForm-input-form'>
          <label>
            <h1 className='dietForm-form-title'>What is your daily fat requirement?</h1>
            <input className='dietForm-input-textbox' type="text" name="fatGoals" value={fatGoals} onChange={handleFatGoalsChange} /> g
          </label>
        </div>

        <div className='dietForm-dropdown-form'>
          <label>
            <h1 className='dietForm-form-title'>How many meals would you like to eat per day?</h1>
            <select className='dietForm-drop-down-select' value={mealsPerDay} onChange={handleMealsPerDayChange}>
              <option className='dietForm-drop-down-options' value="">Select a diet goal</option>
              <option className='dietForm-drop-down-options' value="1">1</option>
              <option className='dietForm-drop-down-options' value="2">2</option>
              <option className='dietForm-drop-down-options' value="3">3</option>
              <option className='dietForm-drop-down-options' value="4">4</option>
            </select>
          </label>
        </div> */}
        {/* <button id='dietForm-button-submit' type="submit">Submit</button> */}
      </form>
      <div style={isLoading} id='dietForm-loading-container'>
        <h1 id="dietForm-loading-text">Loading...</h1>
      </div>
    </div>
  );
}

export default DietForm;