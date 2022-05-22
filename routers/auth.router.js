const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  recoveryPassword,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/authenticate");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/test", (req, res) => {
  res.send("hello");
});
userRouter.get("/getUserInfo", authenticate, getUserInfo);
userRouter.delete("/deleteUser", authenticate, deleteUser);
userRouter.put("/recoveryPassword", authenticate, recoveryPassword);

module.exports = {
  userRouter,
};
