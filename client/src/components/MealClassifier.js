import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import '../style/MealClassifier.css'

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

function MealClassifier() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mealOptions, setMealOptions] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedMealSize, setSelectedMealSize] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMealOptions([]);
    setSelectedMeals([]);
    setNutritionInfo(null);
  }

  const handleMealSizeChange = (event) => {
    setSelectedMealSize(event.target.value);
  }

  const handleSubmit = (event) => {
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
    if (selectedMeals.length === 0 || !selectedMealSize) {
      console.error('No meals or meal size selected');
      return;
    }

    const mealsString = selectedMeals.join(", ");

    axios.post('/fetchNutrition', { meals: mealsString, meal_size: selectedMealSize })
      .then(response => {
        setNutritionInfo(response.data);
      })
      .catch(error => {
        console.error('Error during API call', error);
      });
  }

  const mealOptionsArray = mealOptions.map(meal => ({ value: meal, label: meal }));

  return (
    <div id='imgEst-body-container'>
      <div id="imgEst-title-container">
        <Link to="/app/nutrition" className="diet-back-button-link">
          <p className='diet-back-button'>&#60; Go Back</p>
        </Link>
        <h1 id="imgEst-title-title">Nutrition</h1>
        <p id="imgEst-title-subtext">Estimate Nutritional Info From A Meal Photo</p>
      </div>

      <div id='imgEst-file-container'>
        <form id='imgEst-file-form'>
          <input id='imgEst-file-input' type="file" onChange={handleFileChange} />
          <button id='imgEst-file-submit' onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      <div id='imgEst-choose-meal-container'>
        <Select
          id='imgEst-choose-meal-select'
          isMulti
          options={mealOptionsArray}
          value={selectedMeals.map(meal => ({ value: meal, label: meal }))}
          onChange={selected => setSelectedMeals(selected.map(x => x.value))}
        />
        <select id='imgEst-choose-meal-size-select' value={selectedMealSize} onChange={handleMealSizeChange}>
          <option value="">--Please choose a size--</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
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



