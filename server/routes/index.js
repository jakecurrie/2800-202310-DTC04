const express = require('express');
const router = express.Router();
const userModel = require('../model/users');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});


module.exports = router;

