import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/DietPlan.css'

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
        <div id="dietPlan-body-container">
            <div id="dietPlan-title-container">
                <h1 id="dietPlan-title-title">Diet Plan</h1>
                <div id="dietPlan-title-change-days-container">
                    <h2 id="dietPlan-title-change-prev" onClick={() => setCurrentDayIndex((currentDayIndex - 1 + 7) % 7)}>&#60;</h2>
                    <h2 id="dietPlan-title-day" >{daysOfWeek[currentDayIndex]}</h2>
                    <h2 id="dietPlan-title-change-next" onClick={() => setCurrentDayIndex((currentDayIndex + 1) % 7)}>&#62;</h2>
                </div>
            </div>
            {mealsForCurrentDay.length > 0 ? (
                <div className='dietPlan-card-container'>
                {mealsForCurrentDay.map((meal, index) => (
                    <div className='dietPlan-cards' key={index}>
                        <h2 className='dietPlan-card-h2'>{meal.description}</h2>
                        <p className='dietPlan-card-calories'>Calories: {meal.calories}</p>
                        <p className='dietPlan-card-protein'>Protein: {meal.protein}</p>
                        <p className='dietPlan-card-carbs'>Carbs: {meal.carbs}</p>
                    </div>
                ))}
                </div>
            ) : (
                <div id="dietPlan-card-restday">
                    <p id="dietPlan-restday">Rest Day</p>
                </div>
            )}
            <div id="dietPlan-accept-reject-container">
                <button id="dietPlan-accept-button" onClick={() => {acceptPlan(dataTwo) 
                    navigate('/app/nutrition')}}>Accept</button>
                <button id="dietPlan-reject-button" onClick={regeneratePlan}>Regenerate Plan</button>
            </div>
        </div>
    );
};
    
export default DietPlan;