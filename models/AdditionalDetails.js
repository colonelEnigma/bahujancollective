const { default: mongoose } = require("mongoose");

const AdditionalDetailsSchema = mongoose.Schema({
    lable: {
        type: String,
    },
    points: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('AdditionalDetail', AdditionalDetailsSchema);