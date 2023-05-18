import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
const DietPlan = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const completionResult = (location.state?.completionResult || '[]').trim();
    console.log(completionResult)
    const data = JSON.parse(completionResult).meals;
    const dataTwo = JSON.parse(completionResult);
    console.log(dataTwo)

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const mealsByDay = data.reduce((groups, meals) => {
        const day = meals.day;
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(meals);
        return groups;
    }, {});

    const mealsForCurrentDay = mealsByDay[daysOfWeek[currentDayIndex]] || [];
    const regeneratePlan = () => {
        // Perform regeneration logic here
    
        // Redirect to '/fitness' after regenerating the plan
        navigate('/dietplangenerator');
    };

    const acceptPlan = async (dataTwo) => {
        // i want to take the completionResult and put it into the mongoose database for the current user
        
        try {
            const response = await axios.post('/api/nutrition/save-plan', { dataTwo });
            console.log('Response from API:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error during API call', error);
        }
    }
    return (
        <div id="meal-plan-container">
            <div id="meal-plan-header">
                <h1>Meal Plan</h1>
                <h2>{daysOfWeek[currentDayIndex]}</h2>
            </div>
            {mealsForCurrentDay.length > 0 ? (
                mealsForCurrentDay.map((meal, index) => (
                    <div key={index}>
                        <h6>{meal.description}</h6>
                        <p>calories: {meal.calories}</p>
                        <p>protein: {meal.protein}</p>
                        <p>carbs: {meal.carbs}</p>
                    </div>
                ))
            ) : (
                <p>REST</p>
            )}
            <div>
            <button onClick={() => setCurrentDayIndex((currentDayIndex - 1 + 7) % 7)}>Previous</button>
                <button onClick={() => setCurrentDayIndex((currentDayIndex + 1) % 7)}>Next</button>
            </div>
            <div>
                <button onClick={() => acceptPlan(dataTwo)}>Accept</button>
                <button onClick={regeneratePlan}>Regenerate Plan</button>
            </div>
        </div>
    );
};
    
export default DietPlan;