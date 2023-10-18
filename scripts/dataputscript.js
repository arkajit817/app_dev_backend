

const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const treatmentSchema = require("./../src/server/models/treatment");
let obj = {
  userId: '64f73fcaaa0e0a82ab482d9a',
  patient: 'arkajit',
  treatment_start_date: '2023-12-01',
  treatment_end_date: '2023-12-01',
  symptoms: ['aids', 'std'],
  treatment_goal: ['protected sex'],
  associated_tests: ['abc'],
  medication: ['abc'],
  medical_procedures: ['abc'],
  medical_advice: ['abc'],
  patient_requests: ['qwer'],
  diagnosis: ['condom'],
  institutions: ['asasa'],
  status: 'true',
  comments: ["asdfgh"],
  treating_doctor: ['6512f37fa75bb1e6803abda6']
}
require('mongoose').connect(`${config.dbUrl}`).then((err,db) => {
// MongoClient.connect(`${config.dbUrl}`, function (err, db) {
  console.log("connected to mongoDB");

  treatmentSchema.create(obj).then(async (output) => { 
    console.log(output);
    console.log(db);
    require('mongoose').connection.close();
  });


}).catch((err) => {
  console.log(err);
});



// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = [
//     { _id: 154, name: 'Chocolate Heaven'},
//     { _id: 155, name: 'Tasty Lemon'},
//     { _id: 156, name: 'Vanilla Dream'}
//   ];
//   dbo.collection("products").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     db.close();
//   });
// });
