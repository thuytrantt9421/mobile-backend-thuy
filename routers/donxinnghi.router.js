const express = require('express');
const { userGetList, adminGetList, userCreateDonxinnghi, adminAcceptDonxinnghi, deleteDonxinnghi } = require('../controllers/donxinnghi.controller');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

const donxinnghiRouter = express.Router();

donxinnghiRouter.get('/userGetList', authenticate, userGetList);
donxinnghiRouter.get('/adminGetList', authenticate, authorize, adminGetList);
donxinnghiRouter.post('/createDonxinnghi', authenticate, userCreateDonxinnghi);
donxinnghiRouter.put('/acceptDonxinnghi/:id', authenticate, authorize, adminAcceptDonxinnghi);
donxinnghiRouter.delete('/deleteDonxinnghi/:id', authenticate, deleteDonxinnghi)

module.exports = {donxinnghiRouter}