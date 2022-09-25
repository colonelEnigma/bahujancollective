const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    subDescription: {
        type: String
    },
    note: {
        type: String
    }

}, { timestamps: true });


const additionalDetailsSchema = mongoose.Schema({
    lable: {
        type: String,
    },
    points: {
        type: Array,
        default: []
    }
}, { timestamps: true });


const StorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    about: [aboutSchema],
    registration: [
        { type: Schema.Types.ObjectId, ref: 'EventRegistration' }
    ],
    aditionalDetails: [additionalDetailsSchema]
}, { timestamps: true });


module.exports = mongoose.model('Story', StorySchema);
