const { sequelize } = require("../models/index");
const db = require("../models/index");

let getAllRequest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = "";
      result = await sequelize.query(
        'select d2.*, e."name", d."name" as departments, p."name" as positions from "Donxinnghis" d2 join "Employees" e on d2.user_id = e.user_id join "Departments" d on e.department_id = d.id join "Positions" p on e.position_id = p.id',
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
  getAllRequest: getAllRequest,
};
