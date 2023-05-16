// router.js
const express = require('express');
const router = express.Router();
const getCompletion = require('./openai/OpenAI');
const userModel = require('../model/users');
const fetch = require('node-fetch');

router.post('/record-workout', async (req, res) => {
    const date = new Date();
    const currentDay = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    try {
        console.log(req.session.USER_ID);
        // i want to save the personal best into the user schema the personal best is the data passed in from the post request
        const { exerciseName, personalBest } = req.body;
        // i want to look up the user in the database using the req.session.user_id and then select the fitness plan and then add a key to it personalbest
        const user = await userModel.findOneAndUpdate(
            { _id: req.session.USER_ID, "fitnessPlan.day": daysOfWeek[currentDay], "fitnessPlan.exerciseName": exerciseName },
            { $set: { "fitnessPlan.$.personalBest" : personalBest } },
            { new: true }
        ); 

        if (!user) return res.status(400).send("user does not exist");
        // Handle the generated workout plan (e.g., send it as a response)
        console.log(personalBest)
        res.json(user.fitnessPlan);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/start-workout', async (req, res) => {
    const date = new Date();
    const currentDay = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    try {
        console.log(req.session.USER_ID);
        // i want to save the work out plan into the user schema the work out plan is the data passed in from the post request
        
        
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

router.get('/exercise-video', async (req, res) => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    try {
        const { exerciseName, q } = req.query;
        console.log(exerciseName)

        // Make a request to the YouTube API to fetch videos related to the exercise
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${q}&type=video&maxResults=1`);
  
        // Convert the response to JSON
        const data = await response.json();
  
        // Extract the video ID
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            console.log(videoId)
            // Return the video ID as the response
            res.json({ videoId });
        } else {
            // Handle the case where no videos were found
            res.status(404).json({ error: 'No videos found' });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
