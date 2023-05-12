import React, { useState } from 'react'
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DietForm() {
  const navigate = useNavigate();
  const [completionResult, setCompletionResult] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [exerciseTypes, setExerciseTypes] = useState('');
  const [preferences, setPreferences] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');
  const [interests, setInterests] = useState('');
  const [workoutEnvironment, setWorkoutEnvironment] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [existingRoutines, setExistingRoutines] = useState('');
  const [progressTracking, setProgressTracking] = useState('');
  const [milestones, setMilestones] = useState('');
  const [fitnessPlanDuration, setFitnessPlanDuration] = useState('');
  const [motivations, setMotivations] = useState('');

  const handleFitnessGoalsChange = (e) => {
    setFitnessGoals(e.target.value);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fitnessGoals,
      fitnessLevel,
      selectedDays,
      equipmentAvailable
      // Other form fields...
    };
    // You can perform any further processing or data handling here
    try {
      const response = await axios.post('http://server-service-dot-artificialgains.uw.r.appspot.com/api/fitness/generate-plan', formData);
      console.log('Response from API:', response.data.workoutPlan);
      // Handle the response as needed
      navigate('/FitnessPlan', { state: { completionResult: response.data.workoutPlan } } );
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
    console.log(fitnessGoals, fitnessLevel, selectedDays, equipmentAvailable);
    console.log('Form submitted!');
    console.log('loading...')
  };

  return (
    <div>
      <h1>Diet Questionaire</h1>
      <form onSubmit={handleSubmit}>
        <label>
          What are your current diet goals?
          <select value={fitnessGoals} onChange={handleFitnessGoalsChange}>
            <option value="">Select a diet goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-building">Muscle Building</option>
            <option value="strength-gain">Strength Gain</option>
            <option value="general-health">General Health</option>
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
        </label>

        {/* Add more form fields for the remaining questions */}
        {/* ... */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DietForm;