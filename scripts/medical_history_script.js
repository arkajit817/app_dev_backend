const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const medicalSchema = require("./../src/server/models/medicalHistory");


const data = [{
    "userId": "654a869ec306d98f2a0b5e18",
    "m_date": "2023-10-02",
    "summary": "Some random texts for summary 11111"
}, {

    "userId": "654a869ec306d98f2a0b5e18",
    "m_date": "2023-10-02",
    "summary": "Some random texts for summary 22222"
}];


require('mongoose').connect(`${config.dbUrl}`).then(async (err, db) => {
    console.log("connected to mongoDB");
    for (let o of data) {
        await medicalSchema.create(o).then((output) => {
            console.log(output);
            console.log(db);
        });
    }
    await require('mongoose').connection.close();

}).catch((err) => {
    console.log(err);
});