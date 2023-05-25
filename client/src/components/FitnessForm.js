import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/FitnessForm.css'


axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
function FitnessForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState({ display: 'none' });
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
    console.log(e.target.value);
    setPlanDuration(e.target.value);
  };

  const handleFitnessGoalsChange = (e) => {
    console.log(e.target.value);
    setFitnessGoals(e.target.value);
  };

  const handleFitnessLevelChange = (e) => {
    console.log(e.target.value);
    setFitnessLevel(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  const handleDaySelection = (e) => {
    const value = e.target.value;
    console.log(value);
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const handleEquipmentAvailable = (e) => {
    console.log(e.target.value);
    setEquipmentAvailable(e.target.value);
  };

  const handleIntensityLevelChange = (e) => {
    console.log(e.target.value);
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
    setIsLoading({ display: 'block' });
    console.log(formData);
    try {
      const response = await axios.post('/api/fitness/generate-plan', formData);
      console.log('Response from API:', response.data.workoutPlan);
      // Handle the response as needed
      navigate('/app/FitnessPlan', { state: { completionResult: response.data.workoutPlan } });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    } finally {
      setIsLoading({ display: 'none' });
    }
    console.log(fitnessGoals, fitnessLevel, selectedDays, equipmentAvailable);
    console.log('Form submitted!');
    console.log('loading...')
    // const fitnessPlanResult = await getCompletion(formData);
    // setCompletionResult(fitnessPlanResult);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='fitForm-radio-container'>
            <p className='fitForm-radio-subtext'>Select an answer</p>
            <h1 className='fitForm-drop-down-title' >What are your current fitness goals?</h1>

            <form className='fitForm-radio-form'>
              <div style={fitnessGoals.includes('weight-loss') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-one' id='fitForm-weight-loss' checked={fitnessGoals.includes('weight-loss')} onChange={handleFitnessGoalsChange} value="weight-loss" />
                <label className='fitForm-radio-label' htmlFor='fitForm-weight-loss' value="weight-loss">Weight Loss</label>
              </div>
                <div style={fitnessGoals.includes('strength-gain') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-one' id='fitForm-strength-gain' checked={fitnessGoals.includes('strength-gain')} onChange={handleFitnessGoalsChange} value="strength-gain" />
                <label className='fitForm-radio-label' htmlFor='fitForm-strength-gain' value="strength-gain">Strength Gain</label>
              </div>
              <div style={fitnessGoals.includes('muscle-building') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-one' id='fitForm-muscle-building' checked={fitnessGoals.includes('muscle-building')} onChange={handleFitnessGoalsChange} value="muscle-building" />
                <label className='fitForm-radio-label' htmlFor='fitForm-muscle-building' value="muscle-building">Muscle Building</label>
              </div>
              <div style={fitnessGoals.includes('general-health') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-one' id='fitForm-general-health' checked={fitnessGoals.includes('general-health')} onChange={handleFitnessGoalsChange} value="general-health" />
                <label className='fitForm-radio-label' htmlFor='fitForm-general-health' value="general-health">General Health</label>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className='fitForm-radio-container'>
            <p className='fitForm-radio-subtext'>Select an answer</p>
            <h1 className='fitForm-drop-down-title' >What is your current fitness level?</h1>
            <form className='fitForm-radio-form'>
              <div style={fitnessLevel.includes('beginner') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-two' id='fitForm-beginner' checked={fitnessLevel.includes('beginner')} onChange={handleFitnessLevelChange} value="beginner" />
                <label className='fitForm-radio-label' htmlFor='fitForm-beginner' value="beginner">Beginner</label>
              </div>
              <div style={fitnessLevel.includes('intermediate') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-two' id='fitForm-intermediate' checked={fitnessLevel.includes('intermediate')} onChange={handleFitnessLevelChange} value="intermediate" />
                <label className='fitForm-radio-label' htmlFor='fitForm-intermediate' value="intermediate">Intermediate</label>
              </div>
              <div style={fitnessLevel.includes('advanced') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-two' id='fitForm-advanced' checked={fitnessLevel.includes('advanced')} onChange={handleFitnessLevelChange} value="advanced" />
                <label className='fitForm-radio-label' htmlFor='fitForm-advanced' value="advanced">Advanced</label>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div id='fitForm-button-form'>
            <label>
              <p className='fitForm-radio-subtext'>Select all that applies</p>
              <h1 id="fitForm-button-title">What days of the week would you like to work out?</h1>
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
        );
      case 4:
        return (
          <div className='fitForm-radio-container'>
            <p className='fitForm-radio-subtext'>Select an answer</p>
            <h1 className='fitForm-drop-down-title' >Do you have any equipment available for your workouts?</h1>
            <form className='fitForm-radio-form'>
              <div style={equipmentAvailable.includes('yes') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-three' id='fitForm-yes' checked={equipmentAvailable.includes('yes')} onChange={handleEquipmentAvailable} value="yes" />
                <label className='fitForm-radio-label' htmlFor='fitForm-yes' value="yes">Yes</label>
              </div>
              <div style={equipmentAvailable.includes('no') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-three' id='fitForm-no' checked={equipmentAvailable.includes('no')} onChange={handleEquipmentAvailable} value="no" />
                <label className='fitForm-radio-label' htmlFor='fitForm-no' value="no">No</label>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className='fitForm-radio-container'>
            <p className='fitForm-radio-subtext'>Select an answer</p>
            <h1 className='fitForm-drop-down-title' >What is your intensity level?</h1>
            <form className='fitForm-radio-form'>
              <div style={intensityLevel.includes('low') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-four' id='fitForm-low' checked={intensityLevel.includes('low')} onChange={handleIntensityLevelChange} value="low" />
                <label className='fitForm-radio-label' htmlFor='fitForm-low' value="low">Low</label>
              </div>
              <div style={intensityLevel.includes('medium') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-four' id='fitForm-medium' checked={intensityLevel.includes('medium')} onChange={handleIntensityLevelChange} value="medium" />
                <label className='fitForm-radio-label' htmlFor='fitForm-medium' value="medium">Medium</label>
              </div>
              <div style={intensityLevel.includes('high') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-four' id='fitForm-high' checked={intensityLevel.includes('high')} onChange={handleIntensityLevelChange} value="high" />
                <label className='fitForm-radio-label' htmlFor='fitForm-high' value="high">High</label>
              </div>
            </form>
          </div>
        );
      case 6:
        return (
          <div className='fitForm-radio-container'>
            <p className='fitForm-radio-subtext'>Select an answer</p>
            <h1 className='fitForm-drop-down-title' >How long would you like your fitness plan to be?</h1>
            <form className='fitForm-radio-form'>
              <div style={planDuration.includes('1') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-five' id='fitForm-one-week' checked={planDuration.includes('1')} onChange={handlePlanDurationChange} value="1" />
                <label className='fitForm-radio-label' htmlFor='fitForm-one-week' value="1">1 week</label>
              </div>
              <div style={planDuration.includes('2') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-five' id='fitForm-two-week' checked={planDuration.includes('2')} onChange={handlePlanDurationChange} value="2" />
                <label className='fitForm-radio-label' htmlFor='fitForm-two-week' value="2">2 week</label>
              </div>
              <div style={planDuration.includes('3') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-five' id='fitForm-three-week' checked={planDuration.includes('3')} onChange={handlePlanDurationChange} value="3" />
                <label className='fitForm-radio-label' htmlFor='fitForm-three-week' value="3">3 week</label>
              </div>
              <div style={planDuration.includes('4') ? {backgroundColor: '#1818181f'} : {backgroundColor: 'transparent'}}>
                <input type='radio' className='fitForm-radio-input' name='fitForm-question-five' id='fitForm-four-week' checked={planDuration.includes('4')} onChange={handlePlanDurationChange} value="4" />
                <label className='fitForm-radio-label' htmlFor='fitForm-four-week' value="4">4 week</label>
              </div>
              
            </form>
          
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div id="fitForm-body-container">
      <div id="fitForm-title-container">
        <h1 id="fitForm-title-title">Fitness</h1>
        <h2 id="fitForm-title-subtext">Generate Fitness Plan</h2>
      </div>
      <div id="fitForm-form">
        {renderStep()}
        <div id='fitForm-button-container'>
          {step > 1 && <button id='fitForm-back-button' onClick={handlePrev} type="button">Back</button>}
          {step < 6 ? (
            <button id='fitForm-next-button' onClick={handleNext} type="button">Next</button>
          ) : (
            <button id='fitForm-submit-button' onClick={handleSubmit} type="submit">Submit</button>
          )}
        </div>
      </div>
      <div style={isLoading} id='fitForm-loading-container'>
        <h1 id="fitForm-loading-text">Loading...</h1>
      </div>
    </div>
  );
}

export default FitnessForm;
