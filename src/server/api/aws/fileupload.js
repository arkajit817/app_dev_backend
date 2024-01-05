const express = require('express')
const router = express.Router();

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);
const reportHistory = require("./../../models/reportHistory");
const basicInformation = require("./../../models/basicInformation");
var ObjectId = require('mongoose').Types.ObjectId;

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

async function dbUpdate(result, email) {
    console.log(result, '-------result--------');
    console.log(email, '--------email--------');

    let userId = await basicInformation.find({ email }, { _id: 1 });
    userId = userId[0]._id.toString();
    console.log(userId);
    let obj = {
        imgLocation: result["Location"],
        date: new Date()
    }
    const reportHistoryData = await reportHistory.findOne({ "userId": new ObjectId(userId) });
    if (reportHistoryData) {
        let d = await reportHistory.updateOne(
            { "userId": new ObjectId(userId) },
            {
                "$push": {
                    "report_img_details": {
                        "$each": [obj]
                    }
                }
            }
        );
        console.log(d,'------------');
    }
}


router.route("/").post(upload.single('image'), async (req, res) => {
    const file = req.file;
    const { email } = req.user[0];
    console.log(file)

    // apply filter
    // resize 
    console.log(req.query.type, "-------");

    let uploadfiletype = req.query.type;

    const result = await uploadFile(file, uploadfiletype, email);
    await unlinkFile(file.path);
    let db = await dbUpdate(result, email);

    console.log(result)
    const description = req.body.description
    res.send({ imagePath: `/images/${result.Key}` })
});


module.exports = router;
