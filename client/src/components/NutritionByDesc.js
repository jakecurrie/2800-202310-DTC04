import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

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
    <div>
      <h1>Nutrition Estimator</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Enter meal description:
          <input type="text" value={description} onChange={handleInputChange} />
        </label>
        <button type="submit">Get Nutrition Estimate</button>
      </form>

      {nutritionEstimate && image && (
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height={200} // Adjust the height value as needed
              image={image}
              alt={description}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="div">
                {Object.entries(nutritionEstimate).map(([key, value]) => (
                  <div key={key}>{`${key}: ${value}`}</div>
                ))}
              </Typography>
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




