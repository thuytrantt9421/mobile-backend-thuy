const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/test", (req, res) => {
  res.send("hello");
});

module.exports = {
  userRouter,
};
