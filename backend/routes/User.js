const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "kasir",
      sub: userId,
    },
    "ksr247",
    { expiresIn: "1h" }
  );
};

//register a new user endpoint
userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: {
          messageBody: "Oops, an ERROR has occured during registerstion",
          messageError: true,
        },
      });
    if (user)
      res.status(400).json({
        message: {
          messageBody: "Sorry this username is alreay taken",
          messageError: true,
        },
      });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              messageBody: "Oops, an Error has occured creating a new user",
              messageError: true,
            },
          });
        else {
          res.status(201).json({
            message: "Account created successfully",
            messageError: false,
          });
        }
      });
    }
  });
});

//get all users
userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) =>
        res.status(400).json({
          message: { messageBody: "ERROR:" + err, messageError: true },
        })
      );
  }
);

//Sign in with user details endpoint
userRouter.post(
  "/signIn",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

//logout out a user, and remove any cookies.
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, session: true });
  }
);

//check if user is already authenticated if page is closed.
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = userRouter;
