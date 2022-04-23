const mongoose = require("mongoose");
Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
});

// Creating a Model from that Schema
module.exports = mongoose.model("UserFile", fileSchema);