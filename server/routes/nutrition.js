const express = require('express');
const router = express.Router();
const { getDietPlanCompletion, getNutritionEstimate } = require('./openai/OpenAI'); // refer to openai2.js file for diet plan
const userModel = require('../model/users');

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
        const { data } = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.session.USER_ID,
            {dietPlan: data},
            {new: true}
        );

        if (!user) return res.status(400).send("user does not exist");

        console.log(user);
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

        console.log(user.dietPlan);
        res.json(user.dietPlan);
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

module.exports = router;
