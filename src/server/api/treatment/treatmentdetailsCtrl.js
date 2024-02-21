const router = require("express").Router();
// const test = require("./../../models/testCollection");
const medicalHistory = require("./../../models/medicalHistory");
const basicInformation = require("./../../models/basicInformation");
const treatment = require("./../../models/treatment");
var ObjectId = require('mongoose').Types.ObjectId;

router.route("/").get(async (req, res, next) => {
    try {
        const { email } = req.user[0];
        let output = [];
        // let reportId = '';
        const personInfo = await basicInformation.find({ email }, { _id: 1 });
        const userId = personInfo[0]._id.toString();
        console.log(userId, '------');
        const medicalHistoryData = await medicalHistory.find({ userId: new ObjectId(userId) }, { summary :1,_id:0});
        console.log(medicalHistoryData);

        const treatmentData = await treatment.find({ userId: new ObjectId(userId) });
        console.log(treatmentData, '---testData---');

        res.send({
            medicalHistoryData,
            treatmentData
        });
        
       
    }
    catch (e) {
        console.log(e)
    }

});

router.route("/:tid").get(async (req, res, next) => {
    try {
        const { tid } = req.params;
        const treatmentData = await treatment.find({ _id: new ObjectId(tid) });
        res.send({
            treatmentData
        });
    }
    catch (e) {
        console.log(e)
    }

});

module.exports = router;