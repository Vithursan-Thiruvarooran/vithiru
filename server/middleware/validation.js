import { check } from 'express-validator';

export const signinValidate = [
  // Check Username
  check('email', 'Must be a valid Email Address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  // Check Password
  check('password')
    .trim().escape()
];

export const signupValidate = [
  // Check Username
  check('email', 'Must be a valid Email Address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  // Check Password
  check('password').isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .matches('[0-9]').
    withMessage('Password Must Contain a Number')
    .matches('[A-Z]')
    .withMessage('Password Must Contain an Uppercase Letter')
    .trim().escape(),
  check('firstName')
    .trim().escape(),
  check('lastName')
    .trim().escape()
];
