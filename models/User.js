const mongoose = require('mongoose'), Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
});

module.exports = mongoose.model('User', UserSchema);