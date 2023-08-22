const mongoose = require("mongoose");

const DoctorappSchema = new mongoose.Schema({
    doctorname: { 
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
  specialization: {
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



module.exports = mongoose.model("Doctorapp", DoctorappSchema)
