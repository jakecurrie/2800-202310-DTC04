const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercise_name: String,
    sets: Number,
    reps: Number,
    day: String,
    order: Number,
});

module.exports = mongoose.model('fitness', workoutSchema);
