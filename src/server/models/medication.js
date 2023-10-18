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
    }],
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
        // required: true
    },
    medicationUploads : [{
        type: String,
        required: true
    }],
    treatmentId : {
        type: Schema.Types.ObjectId,
        ref: 'treatment',
    },
    startDate : {

    },
    endDate : {

    } // traetment id



},
    {
        collection: "medication"
    });
module.exports = mongoose.model('medication', medicationSchema)

medicationSchema.plugin(require('mongoose-timestamp'));
medicationSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});
const Medication = module.exports = mongoose.model('Image', medicationSchema);