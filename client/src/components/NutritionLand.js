import React from 'react';
import { useNavigate } from 'react-router-dom';

const NutritionLand = () => {
    
    const navigate = useNavigate();

    const navigateToViewDietPlan = () => {
        navigate('/viewdietplan');
    }

    const navigateToDietPlanGenerator = () => {
        navigate('/dietplangenerator');
    }
    
    const navigateToMealClassifier = () => {
        navigate('/mealClassifier');
    }

    const navigateToNutritionByDesc = () => {
        navigate('/nutritionbydesc');
    }

    return (
        <div>
            <h1>Nutrition</h1>
            <div className="card" onClick={navigateToViewDietPlan}>
                <h2>View Plan</h2>
                <p>Click to view your current meal plan.</p>
            </div>
            <div className="card" onClick={navigateToDietPlanGenerator}>
                <h2>Meal Plan Generator</h2>
                <p>Click to generate a new meal plan.</p>
            </div>
            <div className="card" onClick={navigateToMealClassifier}>
                <h2>Scan Your Food!</h2>
                <p>Our cutting edge food detecting technology will precisely estimate the calories in your meal so you don't have too! All you need is an image! </p>
            </div>
            <div className="card" onClick={navigateToNutritionByDesc}>
                <h2>Describe Your Food!</h2>
                <p>No Camera? No Worries!</p>
                <p>Enter a text description of what you are eating and we will precisely calculate the calories of your meal</p>
            </div>
        </div>
    );
};

export default NutritionLand;