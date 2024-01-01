const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const reportSchema = require("./../src/server/models/reportHistory");


const data = [{
    "userId": "654a869ec306d98f2a0b5e18",
    "report_date": "2023-10-02",
    "lab_name": "gs labs",
    "prescribing_doctor": "sharma",
    "report_summary": [
        "ad sd dsfsfsdfsdfsdf",
    ],
   "report_findings":"Some random text"
},
{
    "userId": "654a869ec306d98f2a0b5e18",
    "report_date": "2023-10-02",
    "lab_name": "gs labs",
    "prescribing_doctor": "sharma",
    "report_summary": [
        "ad sd dsfsfsdfsdfsdf",
    ],
    "report_findings": "Some random text"

    
}];


require('mongoose').connect(`${config.dbUrl}`).then(async (err, db) => {
    console.log("connected to mongoDB");
    for (let o of data) {
        await reportSchema.create(o).then((output) => {
            console.log(output);
            console.log(db);
        });
    }
    await require('mongoose').connection.close();

}).catch((err) => {
    console.log(err);
});