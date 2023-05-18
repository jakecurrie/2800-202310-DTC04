const mongoose = require('mongoose');
const fitnessPlanModel = require('./fitness'); // Import the fitnessPlanSchema from the other file
const dietPlanModel = require('./diet'); // Import the dietPlanSchema from the other file
const userSchema = ({
    'name': { type: String, required: true },
    'email': { type: String, required: true, unique: true },
    'password': { type: String, required: true },
    'profilePicture': { type: String, default: null },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now },
    'fitnessPlan': {type: fitnessPlanModel.schema},
    'dietPlan': {type: dietPlanModel.schema}
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel