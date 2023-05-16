import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const ViewFitnessPlan = () => {
    
    const date = new Date();
    const currentDay = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [fitnessPlan, setFitnessPlan] = useState(null);
    const [currentDayIndex, setCurrentDayIndex] = useState(currentDay); // Initialize with Monday (index 1) 
    useEffect(() => {
        axios.get('/api/fitness/view-plan').then(response => {
            console.log(response.data);
            setFitnessPlan(response.data);
        }).catch(error => {
            console.error('Error during API call', error);
        });
    }, []);

    const handleNextDay = () => {
        setCurrentDayIndex(prevIndex => (prevIndex + 1) % daysOfWeek.length);
    };
    
    const handlePreviousDay = () => {
        setCurrentDayIndex(prevIndex => (prevIndex - 1 + daysOfWeek.length) % daysOfWeek.length);
    };
    const filteredWorkouts = fitnessPlan
    ? fitnessPlan.filter(workout => workout.day === daysOfWeek[currentDayIndex])
    : [];

    


    return (
        <div>
        <h1>{daysOfWeek[currentDayIndex]}'s Workout!</h1>
        {filteredWorkouts.length > 0 ? (
          <div className="card">
            {filteredWorkouts.map((workout, index) => (
              <div key={index}>
                <h2>{workout.exerciseName}</h2>
                <p>Sets: {workout.sets}</p>
                <p>Reps: {workout.reps}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Rest Day</p>
        )}
        <div>
          <button onClick={handlePreviousDay}>Previous</button>
          <button onClick={handleNextDay}>Next</button>
        </div>
      </div>
    );
};

export default ViewFitnessPlan;