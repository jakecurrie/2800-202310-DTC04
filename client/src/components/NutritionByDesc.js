import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import '../style/NutritionByDesc.css'

axios.defaults.withCredentials = true;

function NutritionByDesc() {
  const [description, setDescription] = useState('');
  const [nutritionEstimate, setNutritionEstimate] = useState(null);
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      // Get nutrition estimate
      const response = await axios.post('/api/nutrition/getNutritionEstimate', { description });

      if (response.data && response.data.nutritionEstimate) {
        setNutritionEstimate(response.data.nutritionEstimate);
      } else {
        setError('Unable to get nutrition estimate');
      }

      // Get image from Google Custom Search API
      const imageResponse = await axios.get(`/api/images/searchImage/${description}`);

      if (imageResponse.data.items && imageResponse.data.items.length > 0) {
        setImage(imageResponse.data.items[0].link);
      } else {
        setImage('');
      }

    } catch (e) {
      setError('Error occurred while fetching data');
    }
  };

  return (
    <div id="descEst-body-container">
      <div id="descEst-title-container">
        <h1 id="descEst-title-title">Nutrition</h1>
        <p id="descEst-title-subtext">Estimate Calories</p>
      </div>

      <div id="descEst-desc-input-container">
        <form id="descEst-desc-form" onSubmit={handleSubmit}>
          <label id='descEst-desc-label'>
            <h1 id="descEst-desc-h1">Enter meal description</h1>
            <textarea id="descEst-desc-input" type="text" value={description} onChange={handleInputChange} />
          </label>
          <button id="descEst-desc-submit" type="submit">Get Nutrition Estimate</button>
        </form>
      </div>

      {nutritionEstimate && image && (
        <Card className='descEst-card-container'>
          <CardActionArea>
            <CardMedia
              className='descEst-card-image'
              component="img"
              height={200}
              image={image}
              alt={description}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Box textAlign="center">
                <Typography className='descEst-card-title' gutterBottom variant="h5" component="div">
                  {description}
                </Typography>
                <Typography className='descEst-card-info' variant="body2" color="textSecondary" component="div">
                  {Object.entries(nutritionEstimate).map(([key, value]) => (
                    <div key={key}>{`${key}: ${value}`}</div>
                  ))}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
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





