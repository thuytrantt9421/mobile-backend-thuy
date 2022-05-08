const express = require("express");
const {
  listEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeInfo,
} = require("../controllers/employee.controller");
const { authenticate } = require("../middleware/authenticate");
const { authorize } = require("../middleware/authorize");
const { upload } = require("../middleware/uploadImage");

const employeeRouter = express.Router();

employeeRouter.get("/listEmployee", listEmployee);
employeeRouter.post(
  "/createEmployee",
  authenticate,
  authorize,
  upload.single("timekeeping_photo"),
  createEmployee
);
employeeRouter.put("/updateEmployee", authenticate, updateEmployee);
employeeRouter.delete(
  "/deleteEmployee",
  authenticate,
  authorize,
  deleteEmployee
);
employeeRouter.get("/getEmployeeInfo", authenticate, getEmployeeInfo);

module.exports = { employeeRouter };
