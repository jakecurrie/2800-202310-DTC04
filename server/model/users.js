const mongoose = require('mongoose');
const fitnessPlanModel = require('./fitness'); // Import the fitnessPlanSchema from the other file

const userSchema = ({
    'name': { type: String, required: true },
    'email': { type: String, required: true, unique: true },
    'password': { type: String, required: true },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now },
    'fitnessPlan': [fitnessPlanModel.schema]
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel