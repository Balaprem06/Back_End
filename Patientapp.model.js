const mongoose = require("mongoose");

const PatientappSchema = new mongoose.Schema({
    Patientname: { 
    type: String,
    required: true
  },
  date: { 
    type: String,
    required: true
  },
  time: { 
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
},{ timestamps: true });



module.exports = mongoose.model("Patientapp", PatientappSchema)
