const express = require('express');
const { getDayoff } = require('../controllers/dayoff.controller');

const dayoffRouter = express.Router();

dayoffRouter.get("/dayoff", getDayoff);

module.exports = {dayoffRouter}