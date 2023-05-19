import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import '../style/ViewDietPlan.css'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const ViewDietPlan = () => {

  const date = new Date();
  const currentDay = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dietPlan, setDietPlan] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(currentDay); // Initialize with Monday (index 1) 
  useEffect(() => {
    axios.get('/api/nutrition/view-plan').then(response => {
      console.log(response.data);
      setDietPlan(response.data);
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
  const filteredMeals = dietPlan
    ? dietPlan.filter(meal => meal.day === daysOfWeek[currentDayIndex])
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

  return (
    <div id="viewDiet-body-container">
      <div id="viewDiet-title-container">
        <h1 id="viewDiet-title-title">Diet Plan</h1>
        <div id="viewDiet-title-change-days-container">
          <h2 id="viewDiet-title-change-prev" onClick={handlePreviousDay}>&#60;</h2>
          <h2 id="viewDiet-title-day">{daysOfWeek[currentDayIndex]}</h2>
          <h2 id="viewDiet-title-change-next" onClick={handleNextDay}>&#62;</h2>
        </div>
      </div>
      {filteredMeals.length > 0 ? (
        <div className="viewDiet-card-container">
          {filteredMeals.map((meal, index) => (
            <div className='viewDiet-cards' key={index}>
              <h2 className='viewDiet-card-h2'>{meal.description}</h2>
              <p className='viewDiet-card-calories'>Calories: {meal.calories}</p>
              <p className='viewDiet-card-protein'>Protein: {meal.protein}</p>
              <FontAwesomeIcon className='viewDiet-card-play' icon={faCirclePlay} onClick={() => fetchYouTubeVideo(meal.description)} />
            </div>
          ))}
        </div>
      ) : (
        <div id="viewDiet-card-restday">
          <p id="viewDiet-restday">Rest Day</p>
        </div>
      )}
    </div>
  );
};

export default ViewDietPlan;