const Share = require("../models/Share");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post("/createShare", async (req, res) => {
  try {
    Share.create({
      author: req.body.author || "No title",
      title: req.body.title || "No title",
      tag: req.body.tag || "No Tags",
      photo: req.body.photo || "Photo link or Base64 code not exist",
      person: req.body.person || { Desc: "There is no user" },
    })
      .then((share) => {
        res.status(200).json({
          success: true,
          message: "Schema Created Successfully",
          requestBody: req.body,
          share: share,
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

// Route to get all the notesapi /shorten/:longUrl

router.get("/getShares/:Username", async (req, res) => {
  try {
    Share.find({
      author: req.params.Username,
    })
      .then((share) => {
        res.status(200).json({ share: [...share] });
      })
      .catch((err) => {
        res.status(400).json({ message: "Wrong attempt" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server me kuch dikkat hai" + error });
  }
});

router.delete("/deleteShare/:Username/:id", async (req, res) => {
  try {
    Share.deleteOne({
      _id: req.params.id,
    })
      .then((share) => {
        res
          .status(200)
          .json({
            message: `Successfully deleted with id = ${req.params.id} for User = ${req.params.Username}`,
          });
      })
      .catch(() => {
        res.status(500).json({ message: "Unauthorised" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server me kuch dikkat hai" + error });
  }
});

module.exports = router;
