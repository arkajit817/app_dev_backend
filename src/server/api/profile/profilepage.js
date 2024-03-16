const router = require("express").Router();
// const test = require("./../../models/testCollection");
const { genSaltSync, hashSync } = require("bcryptjs");
const basicInformation = require("../../models/basicInformation");
// const competancymetadata = require("./../../models/competancymetadata");

router.route("/:id").get(async (req, res, next) => {
    try {
        let profid = req.params.id;
        console.log(req.params.id, "params")
        const info = await basicInformation.find().lean();
        console.log(info)
        const data = await basicInformation.findById(profid);
        console.log(data, "data");
        res.send(data);
    } catch (error) {
        res.status(504).send({
            errMsg: "internal server error!!!",
            status: 504
        })
    }

});

router.route("/").put(async (req, res, next) => {
    const { first_name, last_name } = req.body;
    const email = req.user[0];
    let userObj = { ...req.body };
    const updatedData = await basicInformation.findOneAndUpdate(
        { email: req.user[0].email }, {
        $set: {
            ...userObj
        }
    }, {
        upsert: false
    }, ).catch((err) => {
        console.log(err);
        res.status(504).json({
            errMsg: "internal server error",
            status: 504
        })
    })
    console.log(updatedData, "updated")
    if (updatedData.length != 0) {
        console.log(updatedData);
        res.send(updatedData);
    }
});

module.exports = router;
