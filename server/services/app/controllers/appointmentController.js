const { Appointment, Slot } = require("../models");
const nodemailer = require("../helpers/nodemailer");

class appointmentController {
  static create(req, res) {
    const { slot_time, slot_date, name, email, phone } = req.body;

    const newslot = new Slot({
      slot_time,
      slot_date,
      created_at: Date.now(),
    });
    newslot.save();

    const newappointment = new Appointment({
      name,
      email,
      phone,
      slots: newslot._id,
    });
    nodemailer(name, email, slot_date);

    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id }, (err, appointment) =>
        res.json(appointment)
      ).populate("slots");
    });
  }
  static all(req, res) {
    // Returns all appointments
    Appointment.find({}, (err, appointments) =>
      res.status(200).json(appointments)
    );
  }
}

module.exports = appointmentController;
