import React, { useState } from 'react';
import axios from 'axios';
import '../style/MealClassifier.css'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function MealClassifier() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mealOptions, setMealOptions] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMealOptions([]);
    setSelectedMeal('');
    setNutritionInfo(null);
  }

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log('hi');
    event.preventDefault();

    let formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('/classifymeal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })

      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setMealOptions(response.data);
        } else {
          console.error('Response data is not an array');
        }
      })
      .catch(error => {
        console.error('Error during API call', error);
      });
  }

  const fetchNutritionInfo = () => {
    if (!selectedMeal) {
      console.error('No meal selected');
      return;
    }

    axios.post('/fetchNutrition', { meal: selectedMeal })
      .then(response => {
        console.log(response.data);
        setNutritionInfo(response.data);
      })
      .catch(error => {
        console.error('Error during API call', error);
      });
  }

  return (
    <div id='imgEst-body-container'>
      <div id="imgEst-title-container">
        <h1 id="imgEst-title-title">Nutrition</h1>
        <p id="imgEst-title-subtext">Estimate Nutritional Info From A Meal Photo</p>
      </div>

      <div id='imgEst-file-container'>
        <form id='imgEst-file-form'>
          <input id='imgEst-file-input' type="file" onChange={handleFileChange} />
        </form>
          <button id='imgEst-file-submit' onClick={handleSubmit}>Submit</button>
      </div>

      <div id='imgEst-choose-meal-container'>
        <select id='imgEst-choose-meal-select' value={selectedMeal} onChange={handleMealChange}>
          <option id='imgEst-choose-meal-option' value="">--Please choose a meal--</option>
          {mealOptions.map((meal, index) =>
            <option id='imgEst-choose-meal-option' key={index} value={meal}>{meal}</option>
          )}
        </select>
        <button id='imgEst-choose-meal-submit' onClick={fetchNutritionInfo}>Fetch Nutrition Info</button>
      </div>

      {nutritionInfo && (
        <div>
          <h2>Nutrition Info:</h2>
          <p>{JSON.stringify(nutritionInfo)}</p>
        </div>
      )}
    </div>
  );
}

export default MealClassifier;
