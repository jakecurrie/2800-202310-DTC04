const mongoose = require('mongoose');

const fitnessPlanSchema = new mongoose.Schema({
    duration: Number,
    exercises: [{
        exerciseName: String,
        sets: Number,
        reps: Number,
        day: String,
        order: Number,
        personalBest: Number,
        weeksCompleted: {
            type: [{
                week: Number,
                setsRemaining: Number,
                isCompleted: Boolean
            }],
            default: function () {
                return Array.from({ length: this.parent().duration }, (_, index) => ({
                    week: index + 1,
                    setsRemaining: this.sets,
                    isCompleted: false
                }));
            }
        }
    }]
});

 
const FitnessPlanModel = mongoose.model('FitnessPlan', fitnessPlanSchema);

module.exports = FitnessPlanModel;
