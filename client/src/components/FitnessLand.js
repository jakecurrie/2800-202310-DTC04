import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FitnessLand.css'

const FitnessLand = () => {

    const navigate = useNavigate();

    const navigateToViewPlan = () => {
        navigate('/app/viewfitnessplan');
    }

    const navigateToFitnessPlanGenerator = () => {
        navigate('/app/fitnessgenerator');
    }

    const navigateToStartWorkout = () => {
        navigate('/app/startworkout');
    }

    return (
        <div id="fitness-body-container">
            <div id="fitness-title-container">
                <h1 id="fitness-title-h1">Fitness</h1>
                <p id="fitness-title-welcome">Welcome back!</p>
            </div>
            <div id="fitness-card-container">
                <div className="fitness-cards" onClick={navigateToViewPlan}>
                    <h2 className='fitness-card-h2'>View Plan</h2>
                    <p className='fitness-card-p'>Click to view your current fitness plan.</p>
                    <p className="fitness-card-arrow">&#62;</p>
                </div>
                <div className="fitness-cards" onClick={navigateToFitnessPlanGenerator}>
                    <h2 className='fitness-card-h2'>Fitness Plan Generator</h2>
                    <p className='fitness-card-p'>Click to generate a new fitness plan.</p>
                    <p className="fitness-card-arrow">&#62;</p>
                </div>
                <div className="fitness-cards" onClick={navigateToStartWorkout}>
                    <h2 className='fitness-card-h2'>Start Workout</h2>
                    <p className='fitness-card-p'>Lets get started! </p>
                    <p className="fitness-card-arrow">&#62;</p>
                </div>
            </div>
        </div>
    );
};

export default FitnessLand;