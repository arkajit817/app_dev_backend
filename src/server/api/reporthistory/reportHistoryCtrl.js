const router = require("express").Router();
// const test = require("./../../models/testCollection");
const { genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const reportHistory = require("./../../models/reportHistory");
const basicInformation = require("./../../models/basicInformation");
var ObjectId = require('mongoose').Types.ObjectId;

router.route("/").get(async (req, res, next) => {
    const { email } = req.user[0];
    let output = [];
    const personInfo = await basicInformation.find({ email }, { _id: 1 });
    const userId = personInfo[0]._id.toString();
    const reportHistoryData = await reportHistory.find({ "userId": new ObjectId(userId) });
    console.log(JSON.parse(JSON.stringify(reportHistoryData)));
    console.log(typeof reportHistoryData);
    console.log(reportHistoryData);
    // if (typeof reportHistoryData === "object") {
    //     output = [reportHistoryData];
    // } else {
    //     output = [...reportHistoryData];

    // }
    res.send(reportHistoryData);
});

module.exports = router;