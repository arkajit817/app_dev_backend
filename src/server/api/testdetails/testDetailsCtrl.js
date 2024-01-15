const router = require("express").Router();
// const test = require("./../../models/testCollection");
const { genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const testDetails = require("./../../models/testDetails");
const basicInformation = require("./../../models/basicInformation");
var ObjectId = require('mongoose').Types.ObjectId;

router.route("/").get(async (req, res, next) => {
    try {
        const { email } = req.user[0];
        let output = [];
        const personInfo = await basicInformation.find({ email }, { _id: 1 });
        const userId = personInfo[0]._id.toString();
        const testDetailsData = await testDetails.aggregate([
            {
                "$match": {
                    "patientId": new ObjectId(userId)
                }
            },
            {
                "$sort": {
                    "test_date": 1
                }
            },
            {
                "$group": {
                    "_id": {
                        "test_name": "$test_name"
                    },

                    "values": {
                        "$push": {
                            "test_date": "$test_date",
                            "test_numerical_value": "$test_numerical_value"


                        }
                    }

                }
            }, {
                "$project": {
                    "_id": 0,
                    "test_name": "$_id.test_name",
                    "values": "$values"

                }

            }])
        if (Array.isArray(testDetailsData) && testDetailsData.length > 0) {
            res.send(testDetailsData);
        } else {
            res.send([]);
        }
    }
    catch (e) {
        console.log(e)
    }

});

module.exports = router;