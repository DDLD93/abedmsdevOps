const nodeMailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
let mailer = nodeMailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: "abedmis.fmhds@gmail.com",
    pass: "16001105",
  },
}));
async function welcomeMsg(email, name, password, link) {
  try {
    let reposnse = await mailer.sendMail({
      from: `abedms@zohomail.com`, // 
      to: `${email}`,
      subject: "Welcome to ABEDMS portal", // Subject line
      html: `<p>hello ${name} , Welcome to ABEDMS portal</p> </br> 
      <p><span>USERNAME: ${email}</span></p>
      <p><span>password: ${password}</span></p>
      <p>Login at: https://${link}</p>
      `, // plain text body
    })
    return reposnse
  } catch (error) {
    return error
  }
}

async function callToAction(email, name, password, link) {
  try {
    let reposnse = await mailer.sendMail({
      from: `umar.jere@gmail.com`, // sender address
      to: `${email}`,
      subject: "Welcome to ABEDMS portal", // Subject line
      html: `<p>hello ${name} , Welcome to ABEDMS portal</p> </br> 
      <p><span>USERNAME: ${email}</span></br><span>password: ${password}</span></p>
      <p>Login at: https://${link}</p>
      `, // plain text body
    })
    return reposnse
  } catch (error) {
    return error
  }
}
module.exports = { welcomeMsg, callToAction }