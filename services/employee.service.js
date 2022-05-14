const { sequelize } = require("../models/index");
const db = require("../models/index");

let getAllEmployee = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = "";
      result = await sequelize.query(
        'SELECT e.*, d.name as department, p.name as position FROM "Employees" e JOIN "Departments" d ON e.department_id = d.id JOIN "Positions" p ON e.position_id = p.id',
        {
          type: db.SELECT,
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

let getEmployeeByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = "";
      result = await sequelize.query(
        `SELECT e.*, d.name as department, p.name as position FROM "Employees" e JOIN "Departments" d ON e.department_id = d.id JOIN "Positions" p ON e.position_id = p.id WHERE e.user_id = ${id}`,
        {
          type: db.SELECT,
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllEmployee: getAllEmployee,
  getEmployeeByUserId: getEmployeeByUserId,
};
