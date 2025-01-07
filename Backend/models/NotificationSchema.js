const mongoose = require("mongoose");
// const { Schema } = mongoose;

const notificationSchema = new mongoose.Schema({
  author: { type: String, default: "Anonymouse" },
  message: { type: String, required: true }, // The notification content
  type: { type: String, enum: ["info", "alert", "reminder"], required: true }, // Type of notification
  recipients: [
    {
      Username: { type: String, required: true }, // User reference
      read: { type: Boolean, default: false }, // Read status for this user
      readAt: { type: Date }, // Timestamp for when the user read it
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Notification creation timestamp
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
