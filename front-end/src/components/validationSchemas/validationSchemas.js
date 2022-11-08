import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  isSignup: yup
    .boolean(),
  firstName: yup
    .string('Enter your first name')
    .when('isSignup', {
      is: true,
      then: yup.string('Enter your first name').required('First name is required')
    }),
  lastName: yup
    .string('Enter your last name')
    .when('isSignup', {
      is: true,
      then: yup.string('Enter your last name').required('Last name is required')
    }),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .when('isSignup', {
      is: true,
      then: yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
    }),
  confirmPassword: yup
    .string()
    .when(['isSignup', 'password'], {
      is: (isSignup, pass) => (isSignup && pass && pass.length > 0 ? true : false),
      then: yup
        .string()
        .required('Must confirm password')
        .oneOf(
          [yup.ref("password")],
          "Passwords need to match"
        )
    })
});

export const profileValidationSchema = yup.object({
  isSignup: yup
    .boolean(),
  firstName: yup
    .string('Enter your first name')
    .when('isSignup', {
      is: true,
      then: yup.string('Enter your first name').required('First name is required')
    }),
  lastName: yup
    .string('Enter your last name')
    .when('isSignup', {
      is: true,
      then: yup.string('Enter your last name').required('Last name is required')
    }),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .when('isSignup', {
      is: true,
      then: yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
    }),
  confirmPassword: yup
    .string()
    .when(['isSignup', 'password'], {
      is: (isSignup, pass) => (isSignup && pass && pass.length > 0 ? true : false),
      then: yup
        .string()
        .required('Must confirm password')
        .oneOf(
          [yup.ref("password")],
          "Passwords need to match"
        )
    })
});

export const catanGameValidationSchema = yup.object({
  mode: yup
    .string()
    .required('Required'),
  vp: yup
    .number('Must be a number')
    .required('Required'),
  cardStack: yup
    .boolean()
    .required('Required'),
  duration: yup
    .number('Must be a number')
    .required('Required'),
  winner: yup
    .string()
    .required('Required')
});

export const catanGamePlayerValidationSchema = yup.object({
  game: yup
    .string()
    .required('Required'),
  player: yup
    .string()
    .required('Required'),
  vp: yup
    .number('Must be a number')
    .required('Required'),
  dcVp: yup
    .number('Must be a number')
    .required('Required'),
  exVp: yup
    .number('Must be a number')
    .required('Required'),
  knights: yup
    .number('Must be a number')
    .required('Required'),
  largestArmy: yup
    .boolean()
    .required('Required'),
  roads: yup
    .number('Must be a number')
    .required('Required'),
  longestRoad: yup
    .number('Must be a number')
    .required('Required'),
  hasLongestRoad: yup
    .boolean()
    .required('Required'),
  cities: yup
    .number('Must be a number')
    .required('Required'),
  settlements: yup
    .number('Must be a number')
    .required('Required'),
  robbed: yup
    .number('Must be a number')
    .required('Required'),
  trades: yup
    .number('Must be a number')
    .required('Required'),
});

export const catanGameDiceValidationSchema = yup.object({
  game: yup
    .string()
    .required('Required'),
  two: yup
    .number('Must be a number')
    .required('Required'),
  three: yup
    .number('Must be a number')
    .required('Required'),
  four: yup
    .number('Must be a number')
    .required('Required'),
  five: yup
    .number('Must be a number')
    .required('Required'),
  six: yup
    .number('Must be a number')
    .required('Required'),
  seven: yup
    .number('Must be a number')
    .required('Required'),
  eight: yup
    .number('Must be a number')
    .required('Required'),
  nine: yup
    .number('Must be a number')
    .required('Required'),
  ten: yup
    .number('Must be a number')
    .required('Required'),
  eleven: yup
    .number('Must be a number')
    .required('Required'),
  twelve: yup
    .number('Must be a number')
    .required('Required'),
});

export const catanPlayerValidationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Must be more at least 3 characters')
    .max(15, 'Must be less than 15 characters')
    .required('Required'),
});