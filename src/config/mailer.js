// const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Configure the email transport using the default SMTP transport
// const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or another email service provider
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const sendVerificationEmail = (email, token) => {
//     const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Email Verification',
//         html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
//     };

//     return transporter.sendMail(mailOptions);
// };


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const testMail = async () => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'akanjilawrence9999@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email.'
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// testMail();


module.exports = { testMail };
// module.exports = { sendVerificationEmail };
