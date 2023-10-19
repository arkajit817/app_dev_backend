

const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const treatmentSchema = require("./../src/server/models/treatment");
let obj = [{
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
}];
require('mongoose').connect(`${config.dbUrl}`).then(async(err,db) => {
  console.log("connected to mongoDB");
  for (let o of obj){
    await treatmentSchema.create(o).then((output) => {
      console.log(output);
      console.log(db);
    });     
  }
  await require('mongoose').connection.close();

}).catch((err) => {
  console.log(err);
});