const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/searchImage/:description', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: process.env.GOOGLE_API_KEY,
                cx: process.env.SEARCH_ENGINE_ID,
                q: req.params.description,
                searchType: 'image',
                num: 1,
                safe: 'high'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing image search');
    }
});

module.exports = router;