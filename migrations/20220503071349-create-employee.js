"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      DOB: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.STRING,
      },
      cccd: {
        type: Sequelize.STRING,
      },
      front_photo: {
        type: Sequelize.STRING,
      },
      back_photo: {
        type: Sequelize.STRING,
      },
      timekeeping_photo: {
        type: Sequelize.STRING(1000),
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      personalEmail: {
        type: Sequelize.STRING,
      },
      companyEmail: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      skype: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      work_status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: "Users",
          // This is the column name of the referenced model
          key: "id",
        },
      },
      position_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: "Positions",
          // This is the column name of the referenced model
          key: "id",
        },
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: "Departments",
          // This is the column name of the referenced model
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
