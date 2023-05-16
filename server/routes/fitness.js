// router.js
const express = require('express');
const router = express.Router();
const getCompletion = require('./openai/OpenAI');
const userModel = require('../model/users');

router.get('/view-plan', async (req, res) => {
    
    try {
        console.log(req.session.USER_ID);
        // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request
        const { data } = req.body;
        console.log(data);
        const user = await userModel.findById(req.session.USER_ID).select('fitnessPlan').exec();

        // const user = await userModel.findById(req.session.USER_ID);

        if (!user) return res.status(400).send("user does not exist");

        // Handle the generated workout plan (e.g., send it as a response)
        console.log(user.fitnessPlan);
        res.json(user.fitnessPlan);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/generate-plan', async (req, res) => {
    
    try {
        console.log(req.session.USER_ID);
        const workoutPlan = await getCompletion(req, req.body);
        // Handle the generated workout plan (e.g., send it as a response)
        res.send({ workoutPlan });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-plan', async (req, res) => {
    
    try {
        console.log(req.session.USER_ID);
        // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request
        const { data } = req.body;
        console.log(data);
        const user = await userModel.findByIdAndUpdate(
            req.session.USER_ID,
            {fitnessPlan: data},
            {new: true}
        );

        // const user = await userModel.findById(req.session.USER_ID);

        if (!user) return res.status(400).send("user does not exist");

        // Handle the generated workout plan (e.g., send it as a response)
        console.log(user);
        console.log("completed");
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
