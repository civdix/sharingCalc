const Share = require("../models/Share");
const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
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
      date: req.body.date || "00/00/0000",
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
    res
      .status(500)
      .json({ success: false, message: "Internal server me kuch dikkat hai" });
  }
});

// Route to get all the notesapi /shorten/:longUrl

router.get("/getShares/:Username", async (req, res) => {
  try {
    Share.find({
      $or: [
        { author: req.params.Username },
        { person: { $elemMatch: { Username: req.params.Username } } },
      ],
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
router.put("/updateShare/:id", async (req, res) => {
  //Now we will take the NoteId from Header and reder that value to it

  try {
    const ShareId = req.header("ShareId");
    const Username = req.header("Username");

    //diffrent approach to give query as a object not hardcorely bbut by a variable and we will update our query if NoteId is given
    // Default query for upd
    const updateData = await req.body;
    const updatedShare = await Share.findOneAndUpdate(
      { _id: new ObjectId(ShareId) }, // Filter: Match document by _id

      updateData.Desc
        ? {
            $set: {
              "person.$[elem].Username": updateData.Username || Username,
              "person.$[elem].Rs": updateData.Rs, // Update Rs for matching element
              "person.$[elem].Desc": updateData.Desc, // Update Desc for matching element
            },
          }
        : {
            $set: {
              "person.$[elem].Username": updateData.Username || Username,
              "person.$[elem].Rs": updateData.Rs, // Update Rs for matching element
              //  // Update Desc for matching element
            },
          },
      {
        arrayFilters: [{ "elem.Username": Username }], // Array filter for matching Username
        new: true, // Return the updated document
      }
    );

    // const updatedShare = await Share.findOneAndUpdate(query, updateData);

    if (!updatedShare) {
      return res.status(400).send("Share not found");
    }
    console.log("====================================");
    console.log("Updated Share is:", updatedShare);
    console.log("====================================");
    // Send success response with the updated note
    return res.send("Share updated successfully: " + updatedShare);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).send("Internal Server Error");
  }
});
/*
router.put("/updateShare/:id", async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params.id) }; // Use the provided ID to filter the document

    // Ensure req.body is not empty to prevent accidental overwrites
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "No update data provided" });
    }

    const updateDoc = {
      $set: req.body, // Dynamically update fields based on request body
    };

    const result = await Share.updateOne(filter, updateDoc);

    if (result.modifiedCount > 0) {
      console.log("Updated Successfully");
      return res.send({ message: "Update Successful" });
    } else {
      console.log("No document found or no changes detected", filter);
      return res
        .status(404)
        .send({ message: "No document found or no changes detected" });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send({ message: "Failed to update document", error });
  }
});*/

router.delete("/deleteShare/:Username/:id", async (req, res) => {
  try {
    Share.deleteOne({
      _id: req.params.id,
    })
      .then((share) => {
        res.status(200).json({
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
