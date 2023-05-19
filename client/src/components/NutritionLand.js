import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NutritionLand.css'

const NutritionLand = () => {

    const navigate = useNavigate();

    const navigateToViewDietPlan = () => {
        navigate('/app/viewdietplan');
    }

    const navigateToDietPlanGenerator = () => {
        navigate('/app/dietplangenerator');
    }

    const navigateToMealClassifier = () => {
        navigate('/app/mealClassifier');
    }

    const navigateToNutritionByDesc = () => {
        navigate('/app/nutritionbydesc');
    }

    return (
        <div id="nutrition-body-container">
            <div id="nutrition-title-container">
                <h1 id='nutrition-title-title'>Nutrition</h1>
                <p id="nutrition-title-subtext">Welcome back!</p>
            </div>
            <div id="nutrition-card-container">
                <div className="nutrition-cards" onClick={navigateToViewDietPlan}>
                    <h2 className='nutrition-card-h2'>View Plan</h2>
                    <p className='nutrition-card-p'>Click to view your current meal plan.</p>
                    <p className="nutrition-card-arrow">&#62;</p>
                </div>
                <div className="nutrition-cards" onClick={navigateToDietPlanGenerator}>
                    <h2 className='nutrition-card-h2'>Meal Plan Generator</h2>
                    <p className='nutrition-card-p'>Click to generate a new meal plan.</p>
                    <p className="nutrition-card-arrow">&#62;</p>
                </div>
                <div className="nutrition-cards" onClick={navigateToMealClassifier}>
                    <h2 className='nutrition-card-h2'>Scan Your Food!</h2>
                    <p className='nutrition-card-p'>Our cutting edge food detecting technology will precisely estimate the calories in your meal so you don't have too! All you need is an image! </p>
                    <p className="nutrition-card-arrow">&#62;</p>
                </div>
                <div className="nutrition-cards" onClick={navigateToNutritionByDesc}>
                    <h2 className='nutrition-card-h2'>Describe Your Food!</h2>
                    <p className='nutrition-card-p'>No Camera? No Worries!</p>
                    <p className='nutrition-card-p'>Enter a text description of what you are eating and we will precisely calculate the calories of your meal</p>
                    <p className="nutrition-card-arrow">&#62;</p>
                </div>
            </div>
        </div>
    );
};

export default NutritionLand;