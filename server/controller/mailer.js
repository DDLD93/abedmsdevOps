const nodeMailer = require("nodemailer");
let mailer = nodeMailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: "umar.jere@gmail.com",
      pass: "T8KAUShKtnMQ",
    },
  });

  module.exports = {mailer}