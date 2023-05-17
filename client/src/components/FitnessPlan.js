import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
const FitnessPlan = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const completionResult = (location.state?.completionResult || '[]').trim();
    console.log(completionResult)
    const data = JSON.parse(completionResult).exercises;
    const dataTwo = JSON.parse(completionResult);
    console.log(dataTwo)

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const exercisesByDay = data.reduce((groups, exercise) => {
        const day = exercise.day;
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(exercise);
        return groups;
    }, {});

    const exercisesForCurrentDay = exercisesByDay[daysOfWeek[currentDayIndex]] || [];
    const regeneratePlan = () => {
        // Perform regeneration logic here
    
        // Redirect to '/fitness' after regenerating the plan
        navigate('/fitness');
    };

    const acceptPlan = async (dataTwo) => {
        // i want to take the completionResult and put it into the mongoose database for the current user
        
        try {
            const response = await axios.post('/api/fitness/save-plan', { dataTwo });
            console.log('Response from API:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error during API call', error);
        }
    }
    return (
        <div id="fitness-plan-container">
            <div id="fitness-plan-header">
                <h1>Fitness Plan</h1>
                <h2>{daysOfWeek[currentDayIndex]}</h2>
            </div>
            {exercisesForCurrentDay.length > 0 ? (
                exercisesForCurrentDay.map((exercise, index) => (
                    <div key={index}>
                        <h6>{exercise.exerciseName}</h6>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Order: {exercise.order}</p>
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

export default FitnessPlan;
