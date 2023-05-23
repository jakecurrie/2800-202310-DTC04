import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import '../style/FitnessPlan.css'

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
        navigate('/app/fitnessgenerator');
    };

    const fetchYouTubeVideo = async (exerciseName) => {
        try {
          console.log(exerciseName)
          // Make a request to search for videos related to the exercise
          const response = await axios.get('/api/fitness/exercise-video', {
            params: {
              exerciseName: exerciseName,
              part: 'snippet',
              maxResults: 1,
              q: `exercise and fitness how to properly do ${exerciseName}`,
            }
          });
          // Extract the video ID
          console.log(response);
          const videoId = response.data.videoId;
    
          // Open the video in a new tab
          window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        } catch (error) {
          console.error('Error fetching YouTube video:', error);
        }
    
      };

    const acceptPlan = async (dataTwo) => {
        // i want to take the completionResult and put it into the mongoose database for the current user
        try {
            const response = await axios.post('/api/fitness/save-plan', { dataTwo });
            console.log('Response from API:', response.data);
            navigate('/app/fitness');

        } catch (error) {
            console.error('Error during API call', error);
        }
    }
    return (
        <div id="fitGen-body-container">
            <div id="fitGen-title-container">
                <h1 id="fitGen-title-title">Fitness Plan</h1>
                <div id="fitGen-title-change-days-container">
                    <h2 id="fitGen-title-change-prev" onClick={() => setCurrentDayIndex((currentDayIndex - 1 + 7) % 7)}>&#60;</h2>
                    <h2 id="fitGen-title-day" >{daysOfWeek[currentDayIndex]}</h2>
                    <h2 id="fitGen-title-change-next" onClick={() => setCurrentDayIndex((currentDayIndex + 1) % 7)}>&#62;</h2>
                </div>
            </div>
            {exercisesForCurrentDay.length > 0 ? (
                <div id="fitGen-card-container">
                    {exercisesForCurrentDay.map((exercise, index) => (
                        <div className='fitGen-cards' key={index}>
                            <h2 className='fitGen-card-h2' >{exercise.exerciseName}</h2>
                            <p className='fitGen-card-sets' >Sets: {exercise.sets}</p>
                            <p className='fitGen-card-reps' >Reps: {exercise.reps}</p>
                            <p className='fitGen-card-orders' >Order: {exercise.order}</p>
                            <FontAwesomeIcon className='viewFit-card-play' icon={faCirclePlay} onClick={() => fetchYouTubeVideo(exercise.exerciseName)} />
                        </div>
                    ))}
                </div>
            ) : (
                <div id="fitGen-card-restday">
                    <p id="fitGen-restday">Rest Day</p>
                </div>
            )}
            <div id="fitGen-accept-reject-container">
                <button id="fitGen-accept-button" onClick={() => acceptPlan(dataTwo)}>Accept</button>
                <button id="fitGen-reject-button" onClick={regeneratePlan}>Regenerate Plan</button>
            </div>
        </div>
    );
};

export default FitnessPlan;
