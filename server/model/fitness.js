const mongoose = require('mongoose');

const fitnessPlanSchema = new mongoose.Schema({
    exerciseName: String,
    sets: Number,
    reps: Number,
    day: String,
    order: Number,
    personalBest: Number,
    weeksCompleted: [{
        week: Number,
        setsRemaining: Number,
        isCompleted: Boolean
    }],
});
 
const FitnessPlanModel = mongoose.model('FitnessPlan', fitnessPlanSchema);

module.exports = FitnessPlanModel;
