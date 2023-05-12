// router.js
const express = require('express');
const router = express.Router();
const getCompletion = require('./openai/OpenAI');


router.post('/generate-plan', async (req, res) => {
    
    try {
        const workoutPlan = await getCompletion(req.body);
        // Handle the generated workout plan (e.g., send it as a response)
        res.send({ workoutPlan });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
