const { User, TimekeepingInfo } = require("../models");
const { Op } = require("sequelize");

const timeKeeping = async (req, res) => {
  const { user } = req;
  try {
    // const employee = await Employee.findOne({
    //     where : {
    //         id : user.id
    //     }
    // })
    // res.status(200).send(employee);
    const dateNow = new Date();
    const dNow = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate()
    );
    const date = await TimekeepingInfo.findOne({
      where: {
        createdAt: {
          [Op.lt]: dateNow,
          [Op.gt]: dNow,
        },
        user_id: user.id,
      },
    });
    if (date) {
      const d = await TimekeepingInfo.update(
        { status: "end", updatedAt: new Date() },
        {
          where: {
            createdAt: {
              [Op.lt]: dateNow,
              [Op.gt]: dNow,
            },
            user_id: user.id,
          },
        }
      );
      res.status(201).send({ message: "thành công" });
    } else {
      const d = await TimekeepingInfo.create({
        user_id: user.id,
        status: "start",
      });
      res.status(201).send({ message: "thành công" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getTimeKeeping = async (req, res) => {
  const { user } = req;
  const { start, end } = req.body;
  try {
    // console.log(start, end);
    console.log(user);
    if (start == undefined || end == undefined) {
      console.log(user);
      const listLichsu = await TimekeepingInfo.findAll({
        where: {
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - 24 * 10 * 60 * 60 * 1000),
          },
          user_id: user.id,
        },
      });
      res.status(201).send({ message: "thành công", listLichsu });
    } else {
      const listLichsu = await TimekeepingInfo.findAll({
        where: {
          createdAt: {
            [Op.lt]: start,
            [Op.gt]: end,
          },
          user_id: user.id,
        },
      });
      res.status(201).send({ message: "thành công", listLichsu });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const addDayoff = async (req, res) => {};

module.exports = {
  timeKeeping,
  getTimeKeeping,
};
