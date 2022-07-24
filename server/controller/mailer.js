const nodeMailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
let mailer = nodeMailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, //ssl
  auth: {
      user: 'abedms@zohomail.com',
      pass: '2pEr9y4eYTMa'
  }
});
async function welcomeMsg(email, name, password, link, role="user") {
  try {
      let reposnse = await mailer.sendMail({
          from: `abedms@zohomail.com`, // 
          to: `${email}`,
          subject: "Welcome to ABEDMS portal", // Subject line
          html: `<div style="max-width: 300px;padding: auto 2px;text-align: center;background-color: #fff;" >
          <img width="200" height="100" src="https://drive.google.com/uc?export=view&id=1ThJe6C8tsDB9IWj5vkzSIzlsiv3e9WY0" alt="FMHDS NSIP Logo">
          <h3>Welcome ABEDMIS Portal</h3>
          <p>hello ${name} , Welcome to ABEDMS portal</p>
          <p>Your are Receiving this email because you have been registered at ABEDMIS  as a ${role}</p>
          <p><span>password: <strong>${password}</strong></span></p>
          <button style="padding:6px 15px;background-color: #08b629; border: none;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" ><a style="text-decoration: none;color: white;font-size: large;" href="http://ddld.info">LOGIN</a></button>
            <p>Login at: https://${link}</p>
      </div>
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