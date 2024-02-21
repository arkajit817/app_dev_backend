const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basicInformationSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // role: {
    //     type: String,
    //     required: true
    // },
    user_name: {
        type: String,
        required: true
    },
    // userType : {
    //     type: String,
    //     required: true
    // },
    gender : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    medicalrecords : [{
        type: Schema.Types.ObjectId,
        ref: 'report_details',
    }]
    

},
    {
        collection: "basic_information"
    });
module.exports = mongoose.model('basicInformation', basicInformationSchema)