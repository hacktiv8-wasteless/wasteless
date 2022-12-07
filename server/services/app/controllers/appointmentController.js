const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const SendEmail = require("../helpers/nodemailer");

class appointmentController {
  static async create(req, res) {
    const { postId } = req.params;
    const { slot_time, slot_date, username, email, phoneNumber } = req.body;

    const newslot = new Slot({
      slot_time,
      slot_date,
      created_at: Date.now(),
    });
    // console.log(newslot, "<<< ini newslot");
    await newslot.save();

    const newappointment = new Appointment({
      username,
      email,
      phoneNumber,
      slots: newslot._id,
      postId,
      created_at: Date.now(),
    });
    // (err, saved) => {
    //   console.log(saved, "<< coba ini save");
    //   Appointment.find({ _id: saved._id }, (err, appointment) =>
    //     res.json(appointment)
    //   ).populate("slots");
    // };
    // console.log(newappointment, "<<< ini appointment");
    SendEmail(email, username);

    await newappointment.save();
    const newAppoinment = await Appointment.find().populate();
    const createNew = newAppoinment.forEach((el) => el._id);
    res.status(200).json({ createNew, message: "success add appoinment" });
  }
  static async all(req, res) {
    // Returns all appointments
    await Appointment.find({}, (err, appointments) =>
      res.status(200).json(appointments)
    );
  }
}

module.exports = appointmentController;
