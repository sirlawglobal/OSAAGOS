var nodemailer = require("nodemailer");
const sendmail = (name, verificationUrl, email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: "Email Verification",
    text: `Hello ${name},\n\nPlease verify your email by clicking on the following link: \n\n${verificationUrl}\n\nThe link will expire in 24 hours.\n\nBest Regards,\nYour Company Name`,
  };

  const sendMail = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendmail;
