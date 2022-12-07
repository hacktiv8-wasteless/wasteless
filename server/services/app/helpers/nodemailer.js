const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");
const fs = require("fs");

async function nodemailer(email, subject, additionData) {
  try {
    let transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail", // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      })
    );
    await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: ` <div>
    <h1> Selamat ${additionData} Anda Telah membuat janji temu </h1>
    <p>Silahkan Klik Link ini untuk bisa login : <span><a href="https://">Login </a></span></p>
</div>`,
    });
  } catch (error) {
    console.log(error, "<<< ini error nodemailer");
  }
}

module.exports = nodemailer;
