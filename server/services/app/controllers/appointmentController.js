const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const SendEmail = require("../helpers/nodemailer");

class appointmentController {
  static async create(req, res) {
    try {
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
      SendEmail(email, username);
      if (!username || !email || !phoneNumber || !slots || !postId) {
        return res.status(404).json({ message: "Cant get appoinment" });
      }
      await newappointment.save();
      const newAppoinment = await Appointment.find().populate();
      const createNew = newAppoinment.forEach((el) => el._id);
      // console.log(createNew, "<<<");
      res.status(200).json({ message: "success add appoinment" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async all(req, res) {
    // Returns all appointments
    const newAppoinment = await Appointment.find().populate();
    res.status(200).json(newAppoinment);
  }
}

module.exports = appointmentController;
