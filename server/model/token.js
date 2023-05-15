const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tokenSchema = ({
    userID : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // expires in an hour
    }
});

const tokenModel = mongoose.model('token', tokenSchema);

module.exports = tokenModel