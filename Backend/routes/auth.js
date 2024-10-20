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
      body(
        "Username",
        "Please Enter Valid Username"
      ).isString(),
      body("Password", "Please Enter Valid Password").isString(),
    ],
  
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(500).json({Error:errors.array()});
      }
      try {
        User.create({
          Name: req.body.Name,
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Phone: req.body.Phone,
        })
          .then(() => {
            res.json({ token: User.id });
          })
          .catch((err) => {
            if (err.code === 11000) {
              res.status(400).json({
                error: "Sorry user already exist",
              });
              console.log("Email Already exists");
            }
          });
      } catch (error) {
        res.status(500).json({
          error: "Internal Server Error in file auth.js",
        });
        console.log("Error from signUp router in file auth.js");
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
        return res
          .status(200)
          .json({ msg: "Login Successfull", token: user.id });
      } else {
        return res.status(401).json({ msg: "Wrong Password" });
      }
    }
    return res.status(400).json({ msg: "The user not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error from /login route" });
  }
});

// making router to get all the details about the user
router.get("/getData", (req, res) => {
  try {
    const { Username } = req.body;
    const data = User.findOne({ Username }).select("-Password");
    if (data) {
      res.status(200).json(data);
    }
    return res.status(404).json({ msg: "No User found" });
  } catch (error) {
    res.status(400).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;