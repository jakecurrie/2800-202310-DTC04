const mongoose = require('mongoose');

const userSchema = ({
    'name': { type: String, required: true },
    'email': { type: String, required: true, unique: true },
    'password': { type: String, required: true },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now },
    'fitnessPlan': { type: Array, default: [] }
})

const userModel = mongoose.model('users', userSchema);


module.exports = userModel