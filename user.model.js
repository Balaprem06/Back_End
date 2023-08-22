const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  doctorname: { 
    type: String,
    required: true
  },
  degree: { 
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
  specilazation: {
    type: String,
    required: true,
  },
  experience: {
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



module.exports = mongoose.model("users", UserSchema)
