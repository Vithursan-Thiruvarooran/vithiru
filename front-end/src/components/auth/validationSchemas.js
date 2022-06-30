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