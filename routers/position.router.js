const express = require('express');
const { listPositon, createPosition, updatePosition, deletePosition } = require('../controllers/position.controller');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

const positionRouter = express.Router();

positionRouter.get('/listPosition', listPositon);
positionRouter.post('/createPosition', authenticate, authorize, createPosition);
positionRouter.put('/updatePosition', authenticate, authorize, updatePosition);
positionRouter.delete('/deletePosition', authenticate, authorize, deletePosition);

module.exports = {positionRouter}