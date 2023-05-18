const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
    duration: Number,
    meals: [{
        name: String,
        description: String,
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        personalBest: Number,
        day: String,
    }]
});

 
const DietPlanModel = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlanModel;
