import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/FitnessForm.css'


axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
function FitnessForm() {
  const navigate = useNavigate();

  const [completionResult, setCompletionResult] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [intensityLevel, setIntensityLevel] = useState('');
  // const [preferences, setPreferences] = useState('');
  // const [focusAreas, setFocusAreas] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  // const [workoutEnvironment, setWorkoutEnvironment] = useState('');
  // const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  // const [existingRoutines, setExistingRoutines] = useState('');
  // const [progressTracking, setProgressTracking] = useState('');
  // const [milestones, setMilestones] = useState('');
  // const [fitnessPlanDuration, setFitnessPlanDuration] = useState('');
  // const [motivations, setMotivations] = useState('');

  const handlePlanDurationChange = (e) => {
    setPlanDuration(e.target.value);
  };

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

  const handleIntensityLevelChange = (e) => {
    setIntensityLevel(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = {
      fitnessGoals,
      fitnessLevel,
      selectedDays,
      equipmentAvailable,
      intensityLevel,
      planDuration
      // Other form fields...
    };
    // You can perform any further processing or data handling here
    try {
      const response = await axios.post('/api/fitness/generate-plan', formData);
      console.log('Response from API:', response.data.workoutPlan);
      // Handle the response as needed
      navigate('/app/FitnessPlan', { state: { completionResult: response.data.workoutPlan } });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
    console.log(fitnessGoals, fitnessLevel, selectedDays, equipmentAvailable);
    console.log('Form submitted!');
    console.log('loading...')
    // const fitnessPlanResult = await getCompletion(formData);
    // setCompletionResult(fitnessPlanResult);
  };

  return (
    <div id="fitForm-body-container">
      <div id="fitForm-title-container">
        <h1 id="fitForm-title-title">Fitness</h1>
        <h2 id="fitForm-title-subtext">Generate Fitness Plan</h2>
      </div>
      <form id="fitForm-form" onSubmit={handleSubmit}>

        <div className='fitForm-drop-down-form'>
          <label>
            <h1 className='fitForm-drop-down-title' >1. What are your current fitness goals?</h1>
            <select className='fitForm-drop-down-select' value={fitnessGoals} onChange={handleFitnessGoalsChange}>
              <option className='fitForm-drop-down-options' value="">Select a fitness goal</option>
              <option className='fitForm-drop-down-options' value="weight-loss">Weight Loss</option>
              <option className='fitForm-drop-down-options' value="muscle-building">Muscle Building</option>
              <option className='fitForm-drop-down-options' value="strength-gain">Strength Gain</option>
              <option className='fitForm-drop-down-options' value="general-health">General Health</option>
            </select>
          </label>
        </div>

        <div className='fitForm-drop-down-form'>
          <label>
            <h1 className='fitForm-drop-down-title' >2. What is your current fitness level?</h1>
            <select className='fitForm-drop-down-select' value={fitnessLevel} onChange={handleFitnessLevelChange}>
              <option className='fitForm-drop-down-options' value="">Select your fitness level</option>
              <option className='fitForm-drop-down-options' value="beginner">Beginner</option>
              <option className='fitForm-drop-down-options' value="intermediate">Intermediate</option>
              <option className='fitForm-drop-down-options' value="advanced">Advanced</option>
            </select>
          </label>
        </div>

        <div id='fitForm-button-form'>
          <label>
            <h1 id="fitForm-button-title">3. What days of the week would you like to work out?</h1>
            <div id="fitForm-button-lb-container">
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="monday" value="monday" checked={selectedDays.includes('monday')} onChange={handleDaySelection} />
                Monday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="tuesday" value="tuesday" checked={selectedDays.includes('tuesday')} onChange={handleDaySelection} />
                Tuesday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="wednesday" value="wednesday" checked={selectedDays.includes('wednesday')} onChange={handleDaySelection} />
                Wednesday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="thursday" value="thursday" checked={selectedDays.includes('thursday')} onChange={handleDaySelection} />
                Thursday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="friday" value="friday" checked={selectedDays.includes('friday')} onChange={handleDaySelection} />
                Friday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="saturday" value="saturday" checked={selectedDays.includes('saturday')} onChange={handleDaySelection} />
                Saturday
              </label>
              <label className='fitForm-button-label'>
                <input className='fitForm-button-button' type="checkbox" name="sunday" value="sunday" checked={selectedDays.includes('sunday')} onChange={handleDaySelection} />
                Sunday
              </label>
            </div>
          </label>
        </div>

        <div className='fitForm-drop-down-form'>
          <label>
            <h1 className='fitForm-drop-down-title' >
              4. Do you have any equipment available for your workouts, or do you prefer exercises that require little to no equipment?
            </h1>
            <select className='fitForm-drop-down-select' value={equipmentAvailable} onChange={handleEquipmentAvailable}>
              <option className='fitForm-drop-down-options' value="">Select an option</option>
              <option className='fitForm-drop-down-options' value="yes">Yes</option>
              <option className='fitForm-drop-down-options' value="no">No</option>
            </select>
          </label>
        </div>

        <div className='fitForm-drop-down-form'>
          <label>
            <h1 className='fitForm-drop-down-title' >
              5. What is your intensity level?
            </h1>
            <select className='fitForm-drop-down-select' value={intensityLevel} onChange={handleIntensityLevelChange}>
              <option className='fitForm-drop-down-options' value="">Select an option</option>
              <option className='fitForm-drop-down-options' value="low">Low</option>
              <option className='fitForm-drop-down-options' value="medium">Medium</option>
              <option className='fitForm-drop-down-options' value="high">High</option>
            </select>
          </label>
        </div>

        <div className='fitForm-drop-down-form'>
          <label>
            <h1 className='fitForm-drop-down-title' >
              6. How long would you like your fitness plan to be?
            </h1>
            <select className='fitForm-drop-down-select' value={planDuration} onChange={handlePlanDurationChange}>
              <option className='fitForm-drop-down-options' value="">Select an option</option>
              <option className='fitForm-drop-down-options' value="1">1 week</option>
              <option className='fitForm-drop-down-options' value="2">2 weeks</option>
              <option className='fitForm-drop-down-options' value="3">3 weeks</option>
              <option className='fitForm-drop-down-options' value="4">4 weeks</option>
              <option className='fitForm-drop-down-options' value="5">5 weeks</option>
              <option className='fitForm-drop-down-options' value="6">6 weeks</option>
              <option className='fitForm-drop-down-options' value="7">7 weeks</option>
              <option className='fitForm-drop-down-options' value="8">8 weeks</option>
              <option className='fitForm-drop-down-options' value="9">9 weeks</option>
              <option className='fitForm-drop-down-options' value="10">10 weeks</option>
              <option className='fitForm-drop-down-options' value="11">11 weeks</option>
              <option className='fitForm-drop-down-options' value="12">12 weeks</option>
            </select>
          </label>
        </div>
        {/* Add more form fields for the remaining questions */}
        {/* ... */}
        <button id="fitForm-button-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FitnessForm;
