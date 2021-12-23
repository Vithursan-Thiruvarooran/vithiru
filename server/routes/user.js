import express from 'express';
import auth from '../middleware/auth.js';

import { signinValidate, signupValidate } from '../middleware/validation.js';

//Get the function from the file in controllers directory
import {
  signup,
  signin,
  getUser
} from '../controllers/user.js';

const router = express.Router();

//Always import and call that function to keep this file neat
router.post('/signin', signinValidate, signin);
router.post('/signup', signupValidate, signup);
router.get('/:id', auth, getUser);

export default router;