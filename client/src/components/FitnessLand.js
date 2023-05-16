import React from 'react';
import { useNavigate } from 'react-router-dom';

const FitnessLand = () => {
    
    const navigate = useNavigate();

    const navigateToViewPlan = () => {
        navigate('/viewfitnessplan');
    }

    const navigateToFitnessPlanGenerator = () => {
        navigate('/fitnessgenerator');
    }

    return (
        <div>
            <h1>Fitness</h1>
            <div className="card" onClick={navigateToViewPlan}>
                <h2>View Plan</h2>
                <p>Click to view your current fitness plan.</p>
            </div>
            <div className="card" onClick={navigateToFitnessPlanGenerator}>
                <h2>Fitness Plan Generator</h2>
                <p>Click to generate a new fitness plan.</p>
            </div>
        </div>
    );
};

export default FitnessLand;