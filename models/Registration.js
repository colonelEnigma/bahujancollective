const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
    },
    regisrationStatus: {
        type: String,
    },
    startDateTime: {
        type: String
    },
    endDateTime: {
        type: String
    },
    topics: {
        type: Array,
        default: []
    },
    host: {
        type: Array,
        default: []
    },
    coach: {
        type: Array,
        default: []
    },
    link: {
        type: String,
        required: false,
    }

}, { timestamps: true });

const RegistrationSchema = mongoose.Schema({
    title: {
        type: String,
    },
    events: [eventSchema]

}, { timestamps: true });

module.exports = mongoose.model('EventRegistration', RegistrationSchema);
