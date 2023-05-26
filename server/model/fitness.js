const mongoose = require('mongoose');

const fitnessPlanSchema = new mongoose.Schema({
    duration: Number,
    dateCreated: {default: Date.now, type: Date},
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
                isCompleted: Boolean,
                setsData: {
                    type: [{
                        setName: String,
                        weight: Number,
                    }],
                    default: function () {
                        return Array.from({ length: this.parent().sets }, (_, index) => ({
                            setName: 'Set' + (index + 1),
                            weight: 0, // Or you could set this to a default weight
                        }));
                    }
                }
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
