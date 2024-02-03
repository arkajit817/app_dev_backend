const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicalHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'basic_information',
    },
    summary: {
        type: String,
    },
    m_date: {
        type: String,
        required: true
    }
},
    {
        collection: "medical_history"
    });

module.exports = mongoose.model('medicalHistorySchema', medicalHistorySchema);