const axios = require('axios');

async function searchImage(exerciseName) {
    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: process.env.GOOGLE_API_KEY,
                cx: process.env.SEARCH_ENGINE_ID,
                q: exerciseName,
                searchType: 'image',
                num: 1,
                safe: 'high'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error performing image search');
    }
};

module.exports = { searchImage };
