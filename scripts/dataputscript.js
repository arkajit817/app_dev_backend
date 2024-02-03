

const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const treatmentSchema = require("./../src/server/models/treatment");

const fs = require('fs')
const path = 'sample.json'

let filedata = fs.readFileSync(path,'utf8');
console.log(filedata,"file");

const data = JSON.parse(filedata);



require('mongoose').connect(`${config.dbUrl}`).then(async(err,db) => {
  console.log("connected to mongoDB");
  for (let o of data) {
    console.log(o);
    await treatmentSchema.create(o).then((output) => {
      console.log(output);
      console.log(db);
    });     
  }
  await require('mongoose').connection.close();

}).catch((err) => {
  console.log(err);
});