const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Creating Post to signup

router.post(
  "/signUp",
  [
    body("Username", "Please Enter Valid Username").isString(),
    body("Password", "Please Enter Valid Password").isString(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("data entered is not Correct");
      return res.status(500).json({ success: false, Error: errors.array() });
    }
    try {
      console.log("data entered is Correct");

      User.create({
        Name: req.body.Name,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Phone: req.body.Phone,
      })
        .then(() => {
          res.json({
            success: true,
            token: req.body.Username,
            msg: "SignUp Successfull!! \n Account created Successfull",
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            console.log("Email Already exists");
            res.status(406).json({
              message: "Login Credentials Already Exists" + ":\n" + err,
            });
          } else {
            console.log("Email Already exists maybe");
            res.sendError(400, err);
          }
        });
      console.log("Exit from SignUp");
    } catch (error) {
      console.log("Error from signUp router in file auth.js");
      res
        .status(400)
        .json({ success: false, msg: "Internal Server Error in file auth.js" });
    }
  }
);

// Creating a login Route
router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await User.findOne({ Username });
    if (user) {
      if (Password === user.Password) {
        console.log("Login SuccessFull in -> ", Username);

        return res
          .status(200)
          .json({ success: true, msg: "Login Successfull", token: user.id });
      } else {
        console.log("Login UnSuccessFull");

        return res.status(401).json({ success: false, msg: "Wrong Password" });
      }
    }
    console.log("Login UnSuccessFull No User");

    return res.status(400).json({ success: false, msg: "The user not found" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Internal server error from /login route" });
  }
});

// making router to get all the detail
// s about the user
router.get("/getData/:Username", async (req, res) => {
  try {
    const { Username } = req.params;
    const data = await User.findOne({ Username }).select("-Password");

    if (data) {
      return res.status(200).json({ data, msg: "Data Found", success: true });
    }

    return res.status(200).json({ success: false, msg: "No User found" });
  } catch (error) {
    console.error(error); // Logs the error for debugging
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});
module.exports = router;
