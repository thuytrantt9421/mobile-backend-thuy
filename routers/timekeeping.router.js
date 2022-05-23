const express = require("express");
const {
  timeKeeping,
  getTimeKeeping,
  thongtinchamcong,
  getThongtinchamcongBydate,
} = require("../controllers/timekeeping.controller");
const { authenticate } = require("../middleware/authenticate");

const timeKeepingRouter = express.Router();

timeKeepingRouter.post("/chamcong", authenticate, timeKeeping);
timeKeepingRouter.post("/lichsu", authenticate, getTimeKeeping);
timeKeepingRouter.get("/thongtinchamcong", authenticate, thongtinchamcong);
timeKeepingRouter.post(
  "/thongtinchamcongbydate",
  authenticate,
  getThongtinchamcongBydate
);
module.exports = { timeKeepingRouter };
