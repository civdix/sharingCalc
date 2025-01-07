const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const router = express.Router();
const Notificaiton = require("../models/NotificationSchema");
// const User = require("../models/User");
// const { body, validationResult } = require("express-validator");
router.get("/getNotification/:Username", async (req, res) => {
  try {
    Notificaiton.find({
      $or: [
        { author: req.params.Username },
        { recipients: { $elemMatch: { Username: req.params.Username } } },
      ],
    })
      .then((notification) => {
        console.log(notification);

        res.status(200).json({ notification: [...notification] });
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

router.put("/update/:notificationId/:readerUsername", async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const reader = req.params.readerUsername;
    console.log("I am in Under router");
    console.log(req.params);
    const updatedNotification = await Notificaiton.updateMany(
      //   // Usefull when need to make like put read unread feature
      //   notificationId == null
      //     ? {
      //         recipients: {
      //           $elemMatch: { Username: reader },
      //         },
      //       }
      //     : { _id: new ObjectId(notificationId) }, // Filter: Match document by _id
      {
        recipients: {
          $elemMatch: { Username: reader },
        },
      },
      // BtW  i am not doing it now but till there both feature are ready
      notificationId == null
        ? {
            $set: {
              "recipients.$[elem].read": true,
              "recipients.$[elem].readAt": Date,
            },
          }
        : {
            $set: {
              "recipients.$[elem].read": true, // take one more parameter of header value to decide past value of read and accordingly make value of read and readAt
              "recipients.$[elem].readAt": null,
            },
          },
      {
        arrayFilters: [{ "elem.Username": reader }], // Array filter for matching Username
        new: true, // Return the updated document
      }
    );
    console.log(updatedNotification);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
