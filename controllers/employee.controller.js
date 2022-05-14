const { Employee } = require("../models");
const employeeService = require("../services/employee.service");

const listEmployee = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployee();
    res.status(200).send({ employees });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEmployeeInfo = async (req, res) => {
  const id = req.query.id;
  try {
    const employee = await Employee.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createEmployee = async (req, res) => {
  const {
    name,
    lastName,
    firstName,
    DOB,
    gender,
    cccd,
    //        front_photo, back_photo, timekeeping_photo,
    phoneNumber,
    personalEmail,
    companyEmail,
    address,
    skype,
    work_status,
    user_id,
    position_id,
    department_id,
  } = req.body;
  try {
    const newEmployee = await Employee.create({
      name,
      lastName,
      firstName,
      DOB,
      gender,
      cccd,
      // timekeeping_photo: req.file.path,
      phoneNumber,
      personalEmail,
      companyEmail,
      address,
      skype,
      work_status,
      user_id,
      position_id,
      department_id,
    });
    res.status(200).send({ result: "OK", newEmployee });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateEmployee = async (req, res) => {
  const {
    name,
    lastName,
    firstName,
    DOB,
    gender,
    cccd,
    //        front_photo, back_photo, timekeeping_photo,
    phoneNumber,
    personalEmail,
    companyEmail,
    address,
    skype,
    work_status,
    position_id,
    department_id,
  } = req.body;
  try {
    await Employee.update(
      {
        name,
        lastName,
        firstName,
        DOB,
        gender,
        cccd,
        //        front_photo, back_photo, timekeeping_photo,
        phoneNumber,
        personalEmail,
        companyEmail,
        address,
        skype,
        work_status,
        position_id,
        department_id,
      },
      {
        where: {
          id: req.params.employeeId,
        },
      }
    );
    res.status(200).send({ result: "OK" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.destroy({
      where: {
        id: req.params.employeeId,
      },
    });
    res.status(200).send({ result: "OK" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  listEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeInfo,
};
