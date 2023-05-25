import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faImage} from '@fortawesome/free-regular-svg-icons';
import '../style/ViewDietPlan.css';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const ViewDietPlan = () => {
  const date = new Date();
  const currentDay = date.getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dietPlan, setDietPlan] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(currentDay);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const classifyMeal = async (mealName) => {
    let formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await axios.post('/classifyMeal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
  
      const guesses = response.data;
  
      const checkResponse = await axios.post('/api/nutrition/checkMealMatch', JSON.stringify({
        guesses,
        plannedMeal: mealName
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('GPT-3 Response: ' + checkResponse.data.answer);
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  const fetchYouTubeVideo = async (mealName) => {
    try {
      const response = await axios.get('/api/fitness/exercise-video', {
        params: {
          exerciseName: mealName,
          part: 'snippet',
          maxResults: 1,
          q: `How to cook simple ${mealName}`,
        }
      });

      const videoId = response.data.videoId;

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
              <h2 className='viewDiet-card-h2'>{meal.name}</h2>
              <p className='viewDiet-card-calories'>Calories: {meal.calories}</p>
              <p className='viewDiet-card-protein'>Protein: {meal.protein}g</p>
              <FontAwesomeIcon className='viewDiet-card-play' icon={faCirclePlay} onClick={() => fetchYouTubeVideo(meal.name)} />
              <input type="file" onChange={(event) => setSelectedFile(event.target.files[0])} style={{display: 'none'}} id={`upload-${index}`} />
              <label htmlFor={`upload-${index}`}><FontAwesomeIcon className='viewDiet-card-camera' icon={faImage} /></label>
              <button onClick={() => classifyMeal(meal.name)}>Classify meal</button>
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

