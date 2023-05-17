import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function NutritionByDesc() {
  const [description, setDescription] = useState('');
  const [nutritionEstimate, setNutritionEstimate] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('api/nutrition/getNutritionEstimate', { description });
      
      if (response.data && response.data.nutritionEstimate) {
        setNutritionEstimate(response.data.nutritionEstimate);
      } else {
        setError('Unable to get nutrition estimate');
      }
    } catch (e) {
      setError('Error occurred while fetching nutrition estimate');
    }
  };

  return (
    <div>
      <h1>Nutrition Estimator</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Enter meal description:
          <input type="text" value={description} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Nutrition Estimate</button>
      </form>

      {nutritionEstimate && (
        <div>
          <h2>Nutrition Estimate</h2>
          <p>{nutritionEstimate}</p>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default NutritionByDesc;
