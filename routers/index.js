const express = require("express");
const { userRouter } = require("./auth.router");
const { departmentRouter } = require("./department.route");
const { employeeRouter } = require("./employee.router");
const { positionRouter } = require("./position.router");

const rootRouter = express.Router();

rootRouter.use("/auth", userRouter);
rootRouter.use("/department", departmentRouter);
rootRouter.use("/position", positionRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use("/", (req, res) => {
  res.send("hello");
});

module.exports = { rootRouter };
