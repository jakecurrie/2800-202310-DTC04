import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StartWorkout = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const date = new Date();
    const currentDayIndex = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [weight, setWeight] = useState('');
    const [personalBest, setPersonalBest] = useState('');
    const [setsRemaining, setSetsRemaining] = useState(0);

    useEffect(() => {
        axios.get('/api/fitness/start-workout').then(response => {
            const workoutsArray = response.data.filter(item => {
                return item.day === daysOfWeek[currentDayIndex];
            });
            setWorkouts(workoutsArray.sort((a, b) => a.order - b.order));
        }).catch(error => {
            console.error('Error during API call', error);
        });
    }, []);

    useEffect(() => {
        const savedSetsRemaining = localStorage.getItem('setsRemaining');
        if (savedSetsRemaining) {
            setSetsRemaining(parseInt(savedSetsRemaining));
        }
    }, []);

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         localStorage.setItem('setsRemaining', setsRemaining.toString());
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //         localStorage.setItem('setsRemaining', setsRemaining.toString());
    //     };
    // }, [setsRemaining]);

    // useEffect(() => {
    //     if (workouts.length > 0) {
    //         const workout = workouts[currentWorkoutIndex];
    //         setSetsRemaining(workout.sets);
    //     }
    // }, [currentWorkoutIndex, workouts]);

    const handleNextSet = () => {
        
        if (setsRemaining > 1) {
            setSetsRemaining(prevSetsRemaining => prevSetsRemaining - 1);
            localStorage.setItem('setsRemaining', (setsRemaining - 1).toString());
        } else {
            handleNextWorkout();
        }
    
        const enteredWeight = parseInt(weight);
        if (enteredWeight > personalBest) {
            setPersonalBest(enteredWeight);
        }
    }
    
    const handleNextWorkout = () => {
        if (currentWorkoutIndex < workouts.length - 1) {
            setCurrentWorkoutIndex(currentWorkoutIndex + 1);
            setSetsRemaining(workouts[currentWorkoutIndex + 1].sets);
            localStorage.setItem('setsRemaining', workouts[currentWorkoutIndex + 1].sets.toString());
        } else {
            alert("You have completed all your workouts!");
            // Redirect to completion page or home page
        }
    }
    

    const handleWeightChange = (event) => {
        const enteredWeight = event.target.value;
        
        setWeight(enteredWeight);
    }

    if (workouts.length === 0) {
        return <div>Loading...</div>;
    }

    const currentWorkout = workouts[currentWorkoutIndex];

    return (
        <div>
            <h2>{currentWorkout.exerciseName}</h2>
            <p>Reps: {currentWorkout.reps}</p>
            <p>Sets Remaining: {setsRemaining}</p>
            <p>Personal Best: {personalBest}</p>
            <input type="text" placeholder="Enter Weight" value={weight} onChange={handleWeightChange} />
            <button onClick={handleNextSet}>Completed Set</button>
        </div>
    );
};

export default StartWorkout;






