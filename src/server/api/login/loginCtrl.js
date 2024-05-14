const router = require("express").Router();
// const test = require("./../../models/testCollection");
const { genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const basicInformation = require("./../../models/basicInformation");

router.route("/logout").post(async (req, res, next) => {
  res.cookie("token", "");
  res.json({
    message: "Logout successfully",
  });
});

router.route("/").post(async (req, res, next) => {
  const { email, password } = req.body;
  const userDetails = await basicInformation.find(
    { email: email },
    {
      current_level: 1, email: 1, password: 1, _id: 0, role: 1, first_name: 1, last_name: 1, isPayment: 1
      , plays: 1, player_type: 1, height: 1, height_type: 1, weight: 1, weight_type: 1, _id: 1, isActive: 1
    }
  );

  
  if (userDetails.length == 0) {
    res.status(404).send({ message: "user does not exist", status: 404 });
  } else if (!userDetails[0].isActive) {
    res.status(404).send({ message: "user does not exist", status: 404 });
  } else {
    const passwordCheck = compareSync(password, userDetails[0].password);
    if (passwordCheck) {
      let keys = Object.keys(userDetails[0]);
      const isPayments = !keys.includes('isPayment');
      if (isPayments && isPayments !== true) {
        userDetails[0].isPayment = false;
      }
      userDetails[0].password = undefined;
      const jsontoken = sign({ result: userDetails }, "Asdfkgr456Edlflg", {
        expiresIn: "24h",
      });
      res.cookie("token", jsontoken);
      res.json({
        message: "login successfully",
        token: jsontoken,
        current_level: userDetails[0].current_level,
        email: userDetails[0].email,
        _id: userDetails[0]._id,
        role: userDetails[0].role,
        first_name: userDetails[0].first_name,
        last_name: userDetails[0].last_name,
        isActive: userDetails[0].isActive,
        isPayment: userDetails[0].isPayment ? userDetails[0].isPayment : false,
        plays: userDetails[0].plays ? userDetails[0].plays : '',
        player_type: userDetails[0].player_type ? userDetails[0].player_type : '',
        height: userDetails[0].height ? userDetails[0].height : '',
        height_type: userDetails[0].height_type ? userDetails[0].height_type : '',
        weight: userDetails[0].weight ? userDetails[0].weight : '',
        weight_type: userDetails[0].weight_type ? userDetails[0].weight_type : '',

        // weight_type: userDetails[0].weight_type ? userDetails[0].weight_type : '',
        goal_level: userDetails[0].goal_level ? goal_level : '',
        time_frame: userDetails[0].time_frame ? time_frame : ''

      });
    } else {
      res.status(404).send({
        message: "Invalid username or password",
        status: 404,
      });
    }
  }
});

router.route("/").delete(async (req, res, next) => {
  const { email } = req.body;
  let isActive = await basicInformation.find({ email }, { isActive: 1 });
  
  console.log(isActive, '=============');
  if (isActive && isActive.length >0 && !isActive[0].isActive) {
    res.send({
      status: 200,
      msg: "User already deleted..!!!"
    })
  } else {
    res.status(404).send({ message: "user does not exist", status: 404 });
  }
  let result = await basicInformation.findOneAndUpdate({
    email
  }, {
    isActive: false
  }, {
    new: true
  });

  console.log(result, '-----result-----');
  if (!result.isActive) {
    res.send({
      status: 200,
      msg: "User deleted successfully..!!!"
    });
  }
  // else {
  //   res.send({
  //     status: 200,
  //     msg: "User already deleted..!!!"
  //   });
  // }



});

module.exports = router;
