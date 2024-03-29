const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
    },
    patient: {
        type: String,
        required: true
    },
    treatment_start_date: {
        type: String,
        required: true
    },
    treatment_end_date: {
        type: String,
        required: true
    },
    symptoms: [{
        type: String,
        required: true
    }],
    treatment_goal: [{
        type: String,
        required: true
    }],
    associated_tests: [{
        type: String,
        required: true
    }],
    symptoms: [{
        type: String,
        required: true
    }],

    treating_doctors : [{
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
        // required: true
    }],
    medication : [{
        type: String,
        required: true
    }],
    medical_procedures : [{
        type: String,
        required: true
    }],
    medical_advice : [{
        type: String,
        required: true
    }],
    patient_requests : [{
        type: String,
        required: true
    }],
    diagnosis : [{
        type: String,
        required: true
    }],
    institutions : [{
        type: String,
        required: true
    }],
    status : {
        type: String,
        required: true
    },
    comments : [{
        type: String,
        required: true
    }],
    treatment_img_details: {
        type: Array
    },
    summary: {
        type: String
    }
    
},
    {
        collection: "treatment"
    });
treatmentSchema.plugin(require('mongoose-timestamp'));
treatmentSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('treatmentSchema', treatmentSchema)


// mongoose.model('Image', treatmentSchema);
// mongoose.model('basicInformation', basicInformationSchema)