const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportDetailsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
    },
    report_date: {
        type: String,
        required: true
    },
    report_summary: {
        type: String,
    },
    diagonsis: {
        type: Array,
        // required: true
    },
    procedure: [{
        type: Array,
        // required: true
    }],
    findings: {
        type:String
    }
},
    {
        collection: "report_details"
    });

module.exports = mongoose.model('reportDetailsSchema', reportDetailsSchema)


// mongoose.model('Image', treatmentSchema);
// mongoose.model('basicInformation', basicInformationSchema)