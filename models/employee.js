'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Department, Position}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.belongsTo(Department, {foreignKey: 'department_id'});
      this.belongsTo(Position, {foreignKey: 'position_id'});
    }
  }
  Employee.init({
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    gender: DataTypes.STRING,
    cccd: DataTypes.STRING,
    front_photo: DataTypes.STRING,
    back_photo: DataTypes.STRING,
    timekeeping_photo: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    personalEmail: DataTypes.STRING,
    companyEmail: DataTypes.STRING,
    address: DataTypes.STRING,
    skype: DataTypes.STRING,
    facebook: DataTypes.STRING,
    work_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};