const mongoose = require('mongoose');

const RegistrationSchema = mongoose.Schema({
    title: {
        type: String,
        min: 5
    },
    events: [
        { type: Schema.Types.ObjectId, ref: 'EventStory' }
    ]

}, { timestamps: true });

module.exports  = mongoose.model('EventRegistration', RegistrationSchema);
