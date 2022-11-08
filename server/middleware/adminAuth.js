import jwt from "jsonwebtoken";
import User from "../models/user.js";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
      req.token = token;
    }

    // } else {
    //   decodedData = jwt.decode(token);

    //   req.userId = decodedData?.sub;

    //   const user = await User.findOne({ googleId: req.userId });
    //   if (user) {
    //     req.userId = user._id;
    //   }

    //   req.token = token;
    // }

    if (!req.userId) {
      return res.status(201).json({ message: "Unauthenticated" });
    }

    const user = await User.findById(req.userId);
    if (user.role !== 'ADMIN') return res.status(401).json({ message: "Need ADMIN privileges" });

    next();
  } catch (error) {
    //console.log(error);
    return res.status(401).json({ message: "Unauthenticated" });
  }
};

export default auth;