const express = require('express');
const router = express.Router();
const { getDietPlanCompletion, getNutritionEstimate, checkMealMatch } = require('./openai/OpenAI'); // refer to openai2.js file for diet plan
const userModel = require('../model/users');
const openai = require('openai');

openai.apiKey = process.env.GPT_API_KEY;


router.post('/generate-plan', async (req, res) => {
    try {
        const dietPlan = await getDietPlanCompletion(req, req.body);
        res.send({ dietPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-plan', async (req, res) => {
    try {
        console.log(req.session.USER_ID);
        const { dataTwo } = req.body;
        console.log(dataTwo);
        const user = await userModel.findByIdAndUpdate(
            req.session.USER_ID,
            {dietPlan: dataTwo},
            {new: true}
        );

        if (!user) return res.status(400).send("user does not exist");

        // console.log(user);
        console.log("completed");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/view-plan', async (req, res) => {
    try {

        const user = await userModel.findById(req.session.USER_ID).select('dietPlan').exec();

        if (!user) return res.status(400).send("user does not exist");

        console.log(user.dietPlan.meals);
        res.json(user.dietPlan.meals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/getNutritionEstimate', async (req, res) => {
  try {
      const mealDescription = req.body.description;
      const nutritionEstimate = await getNutritionEstimate(mealDescription);
      res.send({ nutritionEstimate });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/checkMealMatch', async (req, res) => {
    const { guesses, plannedMeal } = req.body;
  
    try {
        const userId = req.session.USER_ID;
        const response = await checkMealMatch(guesses, plannedMeal, userId);
        res.json(response);
    } catch (error) {
        console.error('Error during OpenAI API call', error);
        res.status(500).json({ error: 'Error during OpenAI API call' });
    }
});

module.exports = router;
