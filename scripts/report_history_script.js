const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const reportSchema = require("./../src/server/models/reportHistory");


const data = [{
    "userId": "6512b4c0a75bb1e6803abda2",
    "report_date": "2023-10-02",
    "lab_name": "gs labs",
    "prescribing_doctor": "sharma",
    "report_summary": [
        "ad sd dsfsfsdfsdfsdf",
    ]
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