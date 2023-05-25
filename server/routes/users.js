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

module.exports = router;