// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const secret = 'test';

const auth = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const isCustomAuth = token.length < 500;

  //   let decodedData;

  //   if (token && isCustomAuth) {
  //     decodedData = jwt.verify(token, secret);

  //     req.userId = decodedData?.id;
  //     req.token = token;
  //   } else {
  //     decodedData = jwt.decode(token);

  //     req.userId = decodedData?.sub;

  //     const user = await User.findOne({ googleId: req.userId });
  //     if (user) {
  //       req.userId = user._id;
  //     }

  //     req.token = token;
  //   }

  //   if (!req.userId) {
  //     return res.json({ message: "Unauthenticated" });
  //   }

  //   next();
  // } catch (error) {
  //   return res.json({ message: "Unauthenticated" });
  //   console.log(error);
  // }
};

export default auth;