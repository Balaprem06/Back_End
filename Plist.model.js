const mongoose = require("mongoose");

const PlistSchema = new mongoose.Schema({
  patientname: { 
    type: String,
    required: true
  },
  age: { 
    type: String,
    required: true
  },
  phonenumber: { 
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    default: ''
  },
},{ timestamps: true });



module.exports = mongoose.model("Plist", PlistSchema)
