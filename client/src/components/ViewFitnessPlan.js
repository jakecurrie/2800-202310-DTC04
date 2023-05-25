import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import '../style/ViewFitnessPlan.css'

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

  const fetchExerciseImage = async (exerciseName) => {
    try {
      // Make a request to your backend, which should then make a request to the Google Custom Search API
      const response = await axios.get('/api/fitness/exercise-image', {
        params: {
          q: exerciseName,  // The search query
          // other necessary parameters...
        }
      });
      
      // Extract the image URL from the response
      const imageUrl = response.data.items[0].link;
      return imageUrl;
    } catch (error) {
      console.error('Error fetching exercise image:', error);
    }
  };
  
  return (
    <div id="viewFit-body-container">
      <div id="viewFit-title-container">
        <h1 id="viewFit-title-title">Fitness Plan</h1>
        <div id="viewFit-title-change-days-container">
          <h2 id="viewFit-title-change-prev" onClick={handlePreviousDay}>&#60;</h2>
          <h2 id="viewFit-title-day">{daysOfWeek[currentDayIndex]}</h2>
          <h2 id="viewFit-title-change-next" onClick={handleNextDay}>&#62;</h2>
        </div>
      </div>
      {filteredWorkouts.length > 0 ? (
        <div id="viewFit-card-container">
          {filteredWorkouts.map((workout, index) => (
            <div className='viewFit-cards' key={index} >
              <h2 className='viewFit-card-h2'>{workout.exerciseName}</h2>
              <p className='viewFit-card-sets'>Sets: {workout.sets}</p>
              <p className='viewFit-card-reps'>Reps: {workout.reps}</p>
              <FontAwesomeIcon className='viewFit-card-play' icon={faCirclePlay} onClick={() => fetchYouTubeVideo(workout.exerciseName)} />
            </div>
          ))}
        </div>
      ) : (
        <div id="viewFit-card-restday">
          <p id="viewFit-restday">Rest Day</p>
        </div>
      )}
    </div>
  );
};

export default ViewFitnessPlan;