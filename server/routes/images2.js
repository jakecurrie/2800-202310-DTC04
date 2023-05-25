const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/searchImage/:exerciseName', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: process.env.GOOGLE_API_KEY,
                cx: process.env.SEARCH_ENGINE_ID,
                q: req.params.exerciseName,
                searchType: 'image',
                num: 1,
                safe: 'high'
            }
        });
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing image search');
    }
});

module.exports = router;