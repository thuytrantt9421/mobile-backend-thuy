const { User } = require("../models");
const { Employee } = require("../models");
const jwt = require("jsonwebtoken");
const { Auth } = require("two-step-auth");

var OTP = 0;

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(req.body);
  try {
    const newUser = await User.create({ username, password, role, disable: 0 });
    const loginUser = await User.findOne({
      where: {
        username,
        password,
      },
    });
    res.status(200).send({ messange: "Đăng ký thành công", id: loginUser.id });
    console.log(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await User.findOne({
      where: {
        username,
        password,
      },
    });
    if (loginUser) {
      const token = jwt.sign(
        { username, role: loginUser.role, id: loginUser.id },
        "pikachu",
        {
          expiresIn: 60 * 60,
        }
      );
      res.status(201).send({
        messenger: "Đăng nhập thành công",
        id: loginUser.id,
        username: loginUser.username,
        role: loginUser.role,
        token,
      });
    } else {
      res.status(404).send("Tài khoản hoặc mật khẩu bạn không đúng!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserInfo = async (req, res) => {
  const id = req.query.id;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).send({ result: "OK" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const recoveryPassword = async (req, res) => {
  const { password, otp, email, repassword } = req.body;
  try {
    const employee = await Employee.findOne({
      where: {
        personalEmail: email,
      },
    });
    console.log(employee);
    if (otp === OTP && employee && repassword === password) {
      await User.update(
        { password },
        {
          where: {
            id: employee.user_id,
          },
        }
      );
      res.status(200).send({ result: "OK" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const otpRes = await Auth(email);
    OTP = otpRes.OTP;
    res.status(200).send({ result: "OK", otpRes });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  deleteUser,
  recoveryPassword,
  sendOTP,
};
