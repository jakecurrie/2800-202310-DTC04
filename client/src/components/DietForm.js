import React, { useState } from 'react'
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/DietForm.css'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function DietForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({ display: 'none' });
  const [completionResult, setCompletionResult] = useState('');
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

  const handleDaySelection = (e) => {
    const value = e.target.value;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleEquipmentAvailable = (e) => {
    setEquipmentAvailable(e.target.value);
  };

  const handleDietaryRestrictions = (e) => {
    setDietaryRestrictions(e.target.value);
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
        <h1 id="dietForm-title-title">Diet</h1>
        <p id="dietForm-title-subtext">Generate Diet Plan</p>
      </div>
      <form id="dietForm-form" onSubmit={handleSubmit}>
        <div className='dietForm-input-form'>
          <label>
            <h1 className='dietForm-form-title'>What is your daily calorie goal?</h1>
            <input className='dietForm-input-textbox' type="text" name="calorieGoals" value={calorieGoals} onChange={handleCalorieGoalsChange} /> g

            {/* <select value={calorieGoals} onChange={handleCalorieGoalsChange}>
            <option value="">Select a diet goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-building">Muscle Building</option>
            <option value="strength-gain">Strength Gain</option>
            <option value="general-health">General Health</option>
          </select> */}
          </label>
        </div>

        <div className='dietForm-input-form'>
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
        </div>

        {/* <label>
          Do you have any food allergies or sensitivities?
          <select value={dietaryRestrictions} onChange={handleDietaryRestrictions}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label>
          What is your current diet level in terms of being healthy?
          <select value={fitnessLevel} onChange={handleFitnessLevelChange}>
            <option value="">Select your diet level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label>
          What days of the week would you like to eat healthy?
          <div>
            <label>
              <input type="checkbox" name="monday" value="monday" checked={selectedDays.includes('monday')} onChange={handleDaySelection} />
              Monday
            </label>
            <label>
              <input type="checkbox" name="tuesday" value="tuesday" checked={selectedDays.includes('tuesday')} onChange={handleDaySelection} />
              Tuesday
            </label>
            <label>
              <input type="checkbox" name="wednesday" value="wednesday" checked={selectedDays.includes('wednesday')} onChange={handleDaySelection} />
              Wednesday
            </label>
            <label>
              <input type="checkbox" name="thursday" value="thursday" checked={selectedDays.includes('thursday')} onChange={handleDaySelection} />
              Thursday
            </label>
            <label>
              <input type="checkbox" name="friday" value="friday" checked={selectedDays.includes('friday')} onChange={handleDaySelection} />
              Friday
            </label>
            <label>
              <input type="checkbox" name="saturday" value="saturday" checked={selectedDays.includes('saturday')} onChange={handleDaySelection} />
              Saturday
            </label>
            <label>
              <input type="checkbox" name="sunday" value="sunday" checked={selectedDays.includes('sunday')} onChange={handleDaySelection} />
              Sunday
            </label>
          </div>
        </label>
        <label>
          Do you have any equipment available for your diet, or do you prefer easy diet that require little to no kitchen equipment?
          <select value={equipmentAvailable} onChange={handleEquipmentAvailable}>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label> */}

        {/* Add more form fields for the remaining questions */}
        {/* ... */}
        <button id='dietForm-button-submit' type="submit">Submit</button>
      </form>
      <div style={isLoading} id='dietForm-loading-container'>
        <h1 id="dietForm-loading-text">Loading...</h1>
      </div>
    </div>
  );
}

export default DietForm;