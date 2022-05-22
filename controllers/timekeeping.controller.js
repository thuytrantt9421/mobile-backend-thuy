const { User, TimekeepingInfo } = require("../models");
const { Op } = require("sequelize");

const timeKeeping = async (req, res) => {
  const { id } = req.body;
  try {
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
        user_id: id,
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
            user_id: id,
          },
        }
      );
      res.status(201).send({ message: "thành công" });
    } else {
      const d = await TimekeepingInfo.create({
        user_id: id,
        status: "start",
        date: dateNow,
      });
      res.status(200).send({ message: "thành công" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const getTimeKeeping = async (req, res) => {
  const { user } = req;
  const { id, start, end } = req.body;
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
          user_id: id,
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
          user_id: id,
        },
      });
      res.status(200).send({ message: "thành công", listLichsu });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const thongtinchamcong = async (req, res) => {
  const id = req.query.id;
  try {
    const dateNow = new Date();
    const arrDate = [];
    for (let i = 0; i < dateNow.getDate(); i++) {
      arrDate[i] = i + 1;
    }
    const dNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    const d = await TimekeepingInfo.findAll({
      where: {
        createdAt: {
          [Op.lt]: dateNow,
          [Op.gt]: dNow,
        },
        user_id: id,
      },
    });
    const thongtinArr = d.map((day) => {
      if (day.status == "nghi")
        return { day: day.createdAt.getDate(), status: "nghi" };
      else if ((day.updatedAt - day.createdAt) / (60 * 60 * 1000) < 8) {
        return { day: day.createdAt.getDate(), status: "congthieu" };
      } else {
        return { day: day.createdAt.getDate(), status: "congdu" };
      }
    });
    // console.log(dateNow);
    // const thongtinArr = arrDate.map( async (day) =>  {
    //     const d = await TimekeepingInfo.findOne({
    //         where:{
    //             createdAt:{
    //                 [Op.lt]: new Date(dateNow.getFullYear(), dateNow.getMonth(), day, 23),
    //                 [Op.gt]: new Date(dateNow.getFullYear(), dateNow.getMonth(), day)
    //             },
    //             user_id:user.id
    //         }
    //     });
    //     if (d){
    //         if((d.updatedAt-d.createdAt)/(60*60*1000) < 6){
    //             return {day:d.createdAt.getDate(), status:"congthieu"};
    //         }else{
    //             return {day:d.createdAt.getDate(), status:"congdu"};
    //         }
    //     }else{
    //         return {day:day, status:"nghi"};
    //     }
    // });
    res.status(200).send({ message: "thành công", thongtinArr });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addDayoff = async (req, res) => {};

module.exports = {
  timeKeeping,
  getTimeKeeping,
  thongtinchamcong,
};
