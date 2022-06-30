import express from 'express';
import mongoose from 'mongoose';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import User from "../models/user.js";
import Verification from "../models/verification.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import crypto from 'crypto';

import { validationResult } from 'express-validator';

const router = express.Router();
const secret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    //if (oldUser.googleUser) return res.status(400).json({ message: "Can't sign in." });

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
      user: {
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
    
    const verification_token = crypto.randomBytes(128);
    const newVerification = new Verification({ user: newUser._id, code: verification_token });
    await newVerification.save();

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id
      },
      secret,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { email, password, firstName, lastName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((item, index) => {
        if (item.param !== 'password' || password !== '') {
          return res.status(422).json({ errors: errors.array() });
        }
      });
    }

    const oldUser = await User.findOne({ _id: id });

    if (!oldUser) return res.status(400).json({ message: "User doesn't exist" });
    
    var newPass = oldUser.password;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      newPass = hashedPassword;
    }

    const newUser = await User.findByIdAndUpdate(id, 
      { firstName, lastName, email: oldUser.email, password: newPass },
      { new: true });
   
    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const oldUser = await User.findOne({ _id: id });

    if (!oldUser) return res.status(400).json({ message: "User doesn't exist" });
  
    //await User.deleteOne({ _id: id });
   
    res.status(200).send('Deleted User');
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error);
  }
}

export const getUser = async (req, res) => {

}

export const verifyEmail = async (req, res) => {

}

export default router;