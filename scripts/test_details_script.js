const config = require("./../src/server/config/index");
const MongoClient = require('mongodb').MongoClient;
const testDetailsSchema = require("./../src/server/models/testDetails");
// "test": "tid001",
//     "test_date": "2024-01-06", x - axis
// "test_numerical_value: 54.9, - y-axis
// "test_units": "mg/ml",
//     "test_categorical_value": "negative",
//         "diagnostic_test_report": <test report UUID>,
//             "test_name":"urea test" drop down

const data = [{
    "patientId": "654a869ec306d98f2a0b5e18",
    "test": "tid001",
    "test_date": "2023-10-02",
    "test_numerical_value": 54.9,
    "test_units": "mg/ml",
    "test_categorical_value": "negative",
    "diagnostic_test_report": "654a869ec306d98f2a0b5e18t",
    "test_name": "urea test"
},
{
    "patientId": "654a869ec306d98f2a0b5e18",
    "test": "tid001",
    "test_date": "2023-11-02",
    "test_numerical_value": 64.9,
    "test_units": "mg/ml",
    "test_categorical_value": "negative",
    "diagnostic_test_report": "654a869ec306d98f2a0b5e18t",
    "test_name": "urea test"

},
{
    "patientId": "654a869ec306d98f2a0b5e18",
    "test": "tid001",
    "test_date": "2023-10-02",
    "test_numerical_value": 15.9,
    "test_units": "mg/ml",
    "test_categorical_value": "negative",
    "diagnostic_test_report": "654a869ec306d98f2a0b5e18t",
    "test_name": "nerve test"
},
{
    "patientId": "654a869ec306d98f2a0b5e18",
    "test": "tid001",
    "test_date": "2023-11-02",
    "test_numerical_value": 86.9,
    "test_units": "mg/ml",
    "test_categorical_value": "negative",
    "diagnostic_test_report": "654a869ec306d98f2a0b5e18t",
    "test_name": "nerve test"

    },
    {
        "patientId": "654a869ec306d98f2a0b5e18",
        "test": "tid002",
        "test_date": "2023-11-06",
        "test_numerical_value": 96.9,
        "test_units": "mg/ml",
        "test_categorical_value": "negative",
        "diagnostic_test_report": "654a869ec306d98f2a0b5e18t",
        "test_name": "platlette count"

    }
];


require('mongoose').connect(`${config.dbUrl}`).then(async (err, db) => {
    console.log("connected to mongoDB");
    for (let o of data) {
        await testDetailsSchema.create(o).then((output) => {
            console.log(output);
            console.log(db);
        });
    }
    await require('mongoose').connection.close();

}).catch((err) => {
    console.log(err);
});