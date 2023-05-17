import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>

      <select value={selectedMeal} onChange={handleMealChange}>
        <option value="">--Please choose a meal--</option>
        {mealOptions.map((meal, index) => 
          <option key={index} value={meal}>{meal}</option>
        )}
      </select>

      <button onClick={fetchNutritionInfo}>Fetch Nutrition Info</button>

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
