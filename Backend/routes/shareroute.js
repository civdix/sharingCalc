const Share = require("../models/Share");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post("/createShare", async (req, res) => {
  try {
    Share.create({
      title: req.body.title || "No title",
      tag: req.body.tag || "No Tags",
      photo: req.body.photo || "Photo link or Base64 code not exist",
      person: req.body.person || { Desc: "There is no user" },
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Schema Created Successfully",
        });
      })
      .catch((e) => {
        res.status(400).json({
          success: false,
          message: "Schema Creation Unsuccessfull",
          error: e,
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server me kuch dikkat hai" });
  }
});

module.exports = router;
