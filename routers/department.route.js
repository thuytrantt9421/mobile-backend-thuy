const express = require('express');
const { listDepartment, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

const departmentRouter = express.Router();


departmentRouter.get('/listDepartment', listDepartment);
departmentRouter.post('/createDepartment',authenticate, authorize, createDepartment );
departmentRouter.put('/updateDepartment', authenticate, authorize, updateDepartment);
departmentRouter.delete('/deleteDepartment', authenticate, authorize, deleteDepartment)

module.exports = {
    departmentRouter
}