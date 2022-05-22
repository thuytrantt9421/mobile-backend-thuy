const express = require('express');
const { getListWifi } = require('../controllers/wifi.controller');

const wifiRouter = express.Router();

wifiRouter.get('/listWifi', getListWifi)

module.exports ={wifiRouter}