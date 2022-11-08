import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const nodemailer = require('nodemailer');

// console.log(process.env.EMAIL);
// console.log(process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: 'thiruvarooran.vithursan@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// transporter.sendMail(
//   {
//     from: process.env.EMAIL,
//     to: 'thiruvarooran.vithursan@gmail.com',
//     subject: 'Verify new user',
//     text: 'test'
//   }, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

export function sendUserVerification(message) {
  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: 'thiruvarooran.vithursan@gmail.com',
      subject: 'Verify new user',
      text: message
    }, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });