const express = require("express");
const { userRouter } = require("./auth.router");
const { departmentRouter } = require("./department.route");
const { donxinnghiRouter } = require("./donxinnghi.router");
const { employeeRouter } = require("./employee.router");
const { positionRouter } = require("./position.router");
const { timeKeepingRouter } = require("./timekeeping.router");
const { wifiRouter } = require("./wifi.router");

const rootRouter = express.Router();

rootRouter.use("/auth", userRouter);
rootRouter.use("/department", departmentRouter);
rootRouter.use("/position", positionRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use("/timekeeping", timeKeepingRouter);
rootRouter.use("/wifi", wifiRouter);
rootRouter.use("/donxinnghi", donxinnghiRouter);
rootRouter.use("/", (req, res) => {
  res.send("hello");
});

module.exports = { rootRouter };
