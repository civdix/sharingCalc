const mongoose = require("mongoose");
const {Schema} = mongoose;

const ShareSchema = Schema({
    title:{
        type:String,
        require:true,
    },
    tag:{
        type:String
    },
    photo:{
        type:String,
    },
    friends: {
    type: group,
  }
})