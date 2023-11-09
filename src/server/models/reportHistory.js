const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
    },
    report_date: {
        type: String,
        required: true
    },
    lab_name: {
        type: String,
        required: true
    },
    prescribing_doctor: {
        type: String,
        required: true
    },
    report_summary: [{
        type: Array,
        required: true
    }]
},
    {
        collection: "report_history"
    });

module.exports = mongoose.model('reportHistorySchema', reportHistorySchema)


// mongoose.model('Image', treatmentSchema);
// mongoose.model('basicInformation', basicInformationSchema)