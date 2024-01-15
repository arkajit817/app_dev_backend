const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testDetailsSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
    },
    test: {
        type: String,
    },
    test_date: {
        type: String,
        required: true
    },
    test_numerical_value: {
        type: Number,
        required: true
    },
    test_units: {
        type: String,
        required: true
    },
    test_categorical_value: {
        type: String,
        required: true
    },
    diagnostic_test_report: {
        type: String
    },
    test_name: {
        type: String
    }
},
    {
        collection: "test_details"
    });

module.exports = mongoose.model('testDetailsSchema', testDetailsSchema)


// mongoose.model('Image', treatmentSchema);
// mongoose.model('basicInformation', basicInformationSchema)