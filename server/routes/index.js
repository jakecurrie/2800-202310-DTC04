const express = require('express');
const router = express.Router();
const userModel = require('../model/users');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});


router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.session.USER_ID;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profilePictureFilename = req.file.filename;
    user.profilePicture = profilePictureFilename;
    await user.save();

    res.json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});


router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  res.sendFile(filePath);
});

module.exports = router;

