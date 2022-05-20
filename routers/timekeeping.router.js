const express = require('express');
const { timeKeeping, getTimeKeeping } = require('../controllers/timekeeping.controller');
const { authenticate } = require('../middleware/authenticate');

const timeKeepingRouter = express.Router();

timeKeepingRouter.post('/chamcong', authenticate,timeKeeping);
timeKeepingRouter.post('/lichsu', authenticate, getTimeKeeping);
module.exports = {timeKeepingRouter}