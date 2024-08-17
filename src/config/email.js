const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Create a transporter object

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "akanjiayobami71@gmail.com",
      pass: "ayobami7"
    },
});

module.exports = {transporter};
