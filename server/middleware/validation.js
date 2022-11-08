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
    .matches('[0-9]')
    .withMessage('Password Must Contain a Number')
    .matches('[A-Z]')
    .withMessage('Password Must Contain an Uppercase Letter')
    .trim().escape(),
  check('firstName')
    .trim().escape(),
  check('lastName')
    .trim().escape()
];

export const catanGameValidate = [
  check('mode', 'Must be a valid game mode')
    .trim()
    .escape(),
  check('vp')
    .isNumeric()
    .withMessage('VP must be a number')
    .trim().escape(),
  check('cardStack')
    .isBoolean()
    .withMessage('card stack must be either true or false')
    .trim().escape(),
  check('duration')
    .isNumeric()
    .withMessage('Duration must be a number')
    .trim().escape(),
  check('winner')
    .trim().escape()
];

export const catanGamePlayerValidate = [
  check('game', 'Must be a valid game')
    .trim()
    .escape(),
  check('player')
    .trim().escape(),
  check('vp')
    .isNumeric()
    .withMessage('VP must be a number')
    .trim().escape(),
  check('dcVp')
    .isNumeric()
    .withMessage('Development Card Vp must be a number')
    .trim().escape(),
  check('exVp')
    .isNumeric()
    .withMessage('Explorer Vp must be a number')
    .trim().escape(),
  check('knights')
    .isNumeric()
    .withMessage('Knights must be a number'),
  check('largestArmy')
    .isBoolean()
    .withMessage('Largest Army must be either true or false')
    .trim().escape(),
  check('roads')
    .isNumeric()
    .withMessage('Roads must be a number'),
  check('longestRoad')
    .isNumeric()
    .withMessage('Longest road must be a number'),
  check('hasLongestRoad')
    .isBoolean()
    .withMessage('Longest road must be either true or false')
    .trim().escape(),
  check('cities')
    .isNumeric()
    .withMessage('Cities must be a number'),
  check('settlements')
    .isNumeric()
    .withMessage('Settlements must be a number'),
  check('robbed')
    .isNumeric()
    .withMessage('Robbed must be a number'),
  check('trades')
    .isNumeric()
    .withMessage('trades must be a number')
];

export const catanGameDiceValidate = [
  check('game', 'Must be a valid game')
    .trim()
    .escape(),
  check('two')
    .isNumeric()
    .withMessage('Two must be a number')
    .trim().escape(),
  check('three')
    .isNumeric()
    .withMessage('Three must be a number'),
  check('four')
    .isNumeric()
    .withMessage('Four must be a number'),
  check('five')
    .isNumeric()
    .withMessage('Five must be a number'),
  check('six')
    .isNumeric()
    .withMessage('Six must be a number'),
  check('seven')
    .isNumeric()
    .withMessage('Seven must be a number'),
  check('eight')
    .isNumeric()
    .withMessage('Eight must be a number'),
  check('nine')
    .isNumeric()
    .withMessage('Nine must be a number'),
  check('ten')
    .isNumeric()
    .withMessage('Ten must be a number'),
  check('eleven')
    .isNumeric()
    .withMessage('Eleven must be a number'),
  check('twelve')
    .isNumeric()
    .withMessage('Twelve must be a number')
];

export const catanPlayerValidate = [
  check('username')
    .isLength({ min: 3, max: 15})
    .trim().escape(),
];

