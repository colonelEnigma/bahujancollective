const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    username: {
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
    artist: {
        type: Boolean,
        required: false,
        default: false,
    },
    writer: {
        type: Boolean,
        required: false,
        default: false,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'transgender', 'non-binary', 'NA'],
        default: 'NA'
    },
    caste: {
        type: String,
        required: true,
        enum: ['sc', 'st', 'obc', 'nt', 'dnt', 'NA'],
        default: 'NA'
    },
    religion: {
        type: String,
        required: true,
        enum: ['buddhist', 'muslim', 'sikh', 'christian', 'hindu', 'atheist', 'NA'],
        default: 'NA'
    },
    photo: {
        type: String,
        required: false,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);