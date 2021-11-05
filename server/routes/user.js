import express from 'express';
import auth from '../middleware/auth.js'
//Get the function from the file in controllers directory
import {
  signup,
  signin,
  getUser
} from '../controllers/user.js';

const router = express.Router();

//Always import and call that function to keep this file neat
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', auth, getUser);

export default router;