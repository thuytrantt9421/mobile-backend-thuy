const { User, TimekeepingInfo } = require("../models");
const { Op } = require("sequelize");

const timeKeeping = async (req, res) => {
  const { user } = req;
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
        user_id: user.id,
      },
    });
    if (date) {
      await TimekeepingInfo.update(
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
    } else {
      await TimekeepingInfo.create({
        user_id: user.id,
        status: "start",
      });
    }
    // const d = await TimekeepingInfo.findOne({
    //     where:{
    //         createdAt:{
    //             [Op.lt]: dateNow,
    //             [Op.gt]: dNow
    //         },
    //         user_id:user.id
    //     }
    // });
    // console.log(d.createdAt.getDate());
    res.status(201).send({ message: "thành công" });
  } catch (error) {
    res.status(500).send(error);
  }
};
const getTimeKeeping = async (req, res) => {
  const { user } = req;
  const { start, end } = req.body;
  try {
    // console.log(start, end);
    if (start == undefined || end == undefined) {
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

const thongtinchamcong = async (req, res) => {
  const { user } = req;
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
        user_id: user.id,
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
    res.status(201).send({ message: "thành công", thongtinArr });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getThongtinchamcongBydate = async (req, res) => {
  const { user } = req;
  const { date, month, year } = req.body;
  try {
    console.log(date, user);
    const lichsu = await TimekeepingInfo.findOne({
      where: {
        createdAt: {
          [Op.lt]: new Date(year, month - 1, date, 23),
          [Op.gt]: new Date(year, month - 1, date, 0),
        },
        user_id: user.id,
      },
    });
    if (lichsu) {
      if (lichsu.status == "nghi") res.status(201).send({ lichsu });
      else if ((lichsu.updatedAt - lichsu.createdAt) / (60 * 60 * 1000) < 8) {
        res.status(201).send({ lichsu, status: "congthieu" });
      } else {
        res.status(201).send({ lichsu, status: "congdu" });
      }
    } else {
      res.status(201).send({ message: "không tìm thấy" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const addDayoff = async (req, res) => {};

module.exports = {
  timeKeeping,
  getTimeKeeping,
  thongtinchamcong,
  getThongtinchamcongBydate,
};
