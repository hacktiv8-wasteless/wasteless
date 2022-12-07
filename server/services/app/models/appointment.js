const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const appointmentSchema = mongoose.Schema({
  id: {
    type: ObjectId,
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phoneNumber is required"],
  },
  slots: {
    type: ObjectId,
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
