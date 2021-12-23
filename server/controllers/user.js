import express from 'express';
import mongoose from 'mongoose';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';

const router = express.Router();
const secret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    if (oldUser.googleUser) return res.status(400).json({ message: "Can't sign in." });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id
      },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      result: {
        id: oldUser._id,
        email: oldUser.email,
        firstName: oldUser.firstName,
        lastName: oldUser.lastName
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const signup = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password, firstName, lastName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
    const result = newUser;

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id
      },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      result: {
        id: oldUser._id,
        email: oldUser.email,
        firstName: oldUser.firstName,
        lastName: oldUser.lastName
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });

    await newUser.save();
    const result = newUser;

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export default router;