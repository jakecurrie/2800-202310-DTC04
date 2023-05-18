import React, { useState } from 'react'
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function DietForm() {
  const navigate = useNavigate();
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
    try {
      const response = await axios.post('/api/nutrition/generate-plan', formData);
      console.log('Response from API:', response.data.dietPlan);
      // Handle the response as needed
      navigate('/dietPlan', { state: { completionResult: response.data.dietPlan } } );
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
    console.log(calorieGoals, fitnessLevel, selectedDays, equipmentAvailable);
    console.log('Form submitted!');
    console.log('loading...')
  };

  return (
    <div>
      <h1>Diet Questionaire</h1>
      <form onSubmit={handleSubmit}>
        <label>
          What is your daily calorie goal?

          <input type="text" name="calorieGoals" value={calorieGoals} onChange={handleCalorieGoalsChange} />
        
          {/* <select value={calorieGoals} onChange={handleCalorieGoalsChange}>
            <option value="">Select a diet goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-building">Muscle Building</option>
            <option value="strength-gain">Strength Gain</option>
            <option value="general-health">General Health</option>
          </select> */}
        </label>
        <label>
          What is your daily protein requirement?
          <input type="text" name="proteinGoals" value={proteinGoals} onChange={handleProteinGoalsChange} />
        </label>
        <label>
          What is your daily carb requirement?
          <input type="text" name="carbGoals" value={carbGoals} onChange={handleCarbGoalsChange} />
        </label>
        <label>
          What is your daily fat requirement?
          <input type="text" name="fatGoals" value={fatGoals} onChange={handleFatGoalsChange} />
        </label>
        <label>
          How many meals would you like to eat per day?
          <select value={mealsPerDay} onChange={handleMealsPerDayChange}>
            <option value="">Select a diet goal</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </label>

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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DietForm;