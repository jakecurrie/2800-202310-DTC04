const express = require('express');
const router = express.Router();
const userModel = require('../model/users');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

router.get('/profile', async (req, res) => {
    try {
      const user = await userModel.findOne({ email: 'test@gmail.com' });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
        const userResponse = {
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
  
      res.json(userResponse);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  });

module.exports = router;

