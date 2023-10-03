const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
    morning: [{
        type: String,
        required: true
    }],
    afternoon: [{
        type: String,
        required: true
    }],
    evening: [{
        type: String,
        required: true
    }],
    night: [{
        type: String,
        required: true
    }]



},
    {
        collection: "medication"
    });
module.exports = mongoose.model('medication', medicationSchema)