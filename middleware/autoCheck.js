const { User, TimekeepingInfo } = require("../models");
const { Op } = require("sequelize");
const autoCheck = async () => {
  const user = await User.findAll();
  setInterval(async () => {
    const date = new Date();
    const dNow = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (date.getHours() > 14) {
      for (let i = 0; i < user.length; i++) {
        const timeKeeping = await TimekeepingInfo.findAll({
          where: {
            createdAt: {
              [Op.lt]: date,
              [Op.gt]: dNow,
            },
            user_id: user[i].id,
          },
        });
        if (!timeKeeping) {
          await TimekeepingInfo.create({
            user_id: user[i].id,
            status: "nghi",
          });
        }
      }
    }
  }, 1000 * 60 * 60 * 3);
};

module.exports = { autoCheck };
