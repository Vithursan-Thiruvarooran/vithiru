import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

var nodemailer = require('nodemailer');

console.log(process.env.EMAIL);
console.log(process.env.EMAIL_PASS);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: '',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });