const express = require('express');
const axios = require('axios');
const router = express.Router();
const userModel = require('../model/users');
const fitnessModel = require('../model/fitness');
const dietModel = require('../model/diet');

router.get('/leaderboard', async (req, res) => {
    try {
        const users = await userModel.find().exec();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/currentPoint', async (req, res) => {
    try {
        const user = await userModel.findById(req.session.USER_ID).exec()
        res.json(user.points)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/nearbyUsers', async (req, res) => {
    try {
        const users = await userModel.find().sort({ points: -1 }).exec();
        const currentUserIndex = users.findIndex(user => user._id.toString() === req.session.USER_ID);
        let start, end;
        
        if (currentUserIndex === 0 || currentUserIndex === 1) {
          // When the current user is the first or second, display top 5 users
          start = 0;
          end = Math.min(users.length, 5);
        } else if (currentUserIndex === users.length - 1 || currentUserIndex === users.length - 2) {
          // When the current user is the last or second last, display last 5 users
          start = Math.max(0, users.length - 5);
          end = users.length;
        } else {
          // Otherwise, display the current user and two users ahead and behind
          start = currentUserIndex - 2;
          end = currentUserIndex + 3;
        }

        const aroundMeUsers = users.slice(start, end);
        res.json(aroundMeUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;