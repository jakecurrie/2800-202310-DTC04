const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


const apiKey = process.env.GPT_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey
});

const openai = new OpenAIApi(configuration);

router.post('/getNutritionEstimate', async (req, res) => {
    const mealDescription = req.body.description;
    const prompt = `${mealDescription}\n\nEstimated nutritional information:`;
    console.log(prompt);
    try {
      const gptResponse = await openai.createCompletion({
        engine: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 2000
      });
  
      if (gptResponse && gptResponse.choices && gptResponse.choices.length > 0) {
        const nutritionEstimate = gptResponse.choices[0].text.trim();
        res.json({ nutritionEstimate });
      } else {
        res.status(500).send('Error getting nutrition estimate from GPT-3');
      }
    } catch (e) {
      console.error("Error with GPT-3 API: ", e);
      res.status(500).send('Error with GPT-3 API');
    }
});

module.exports = router;
