const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Configure the email transport using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = (email, token) => {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
    };

    return transporter.sendMail(mailOptions);
};





// module.exports = { testMail };
module.exports = { sendVerificationEmail };
