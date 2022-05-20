const { User, TimekeepingInfo } = require("../models");
const { Op } = require("sequelize");

const timeKeeping = async (req, res) => {
  const { user } = req;
  const { status } = req.body;
  try {
    // const employee = await Employee.findOne({
    //     where : {
    //         id : user.id
    //     }
    // })
    // res.status(200).send(employee);
    const d = await TimekeepingInfo.create({
      status: status,
      user_id: user.id,
    });

    const date = new Date();
    res.status(201).send({ message: "thành công" });
    console.log(date.getMonth());
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
          createAt: {
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
          createAt: {
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
module.exports = {
  timeKeeping,
  getTimeKeeping,
};
