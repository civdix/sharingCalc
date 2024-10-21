const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  Username: {
    type: String,
    unique: true,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  Phone: {
    type: Number,
  },
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
