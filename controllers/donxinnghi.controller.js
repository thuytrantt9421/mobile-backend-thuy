const { Donxinnghi } = require("../models");

const userGetList = async (req, res) => {
  const { user } = req;
  try {
    const listDonxinnghi = Donxinnghi.findAll({
      where: {
        user_id: user.id,
      },
    });
    res.status(201).send({ listDonxinnghi });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adminGetList = async (req, res) => {
  try {
    const listDonxinnghi = Donxinnghi.findAll();
    res.status(201).send({ listDonxinnghi });
  } catch (error) {
    res.status(500).send(error);
  }
};

const userCreateDonxinnghi = async (req, res) => {
  const { user } = req;
  const { date, reason } = req.body;
  try {
    const donxinnghi = Donxinnghi.create({
      user_id: user.id,
      date: date,
      status: "wait",
      reason: reason,
    });
    res.status(201).send({ donxinnghi });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adminAcceptDonxinnghi = async (req, res) => {
  try {
    const donxinnghi = Donxinnghi.update(
      {
        status: "accept",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send({ donxinnghi });
  } catch (error) {
    res.status(500).send(error);
  }
};

const adminRefuseDonxinnghi = async (req, res) => {
  try {
    const donxinnghi = Donxinnghi.update(
      {
        status: "refuse",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send({ donxinnghi });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDonxinnghi = async (req, res) => {
  try {
    const donxinnghi = Donxinnghi.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).send({ message: "thành công" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userGetList,
  adminGetList,
  userCreateDonxinnghi,
  adminAcceptDonxinnghi,
  deleteDonxinnghi,
  adminRefuseDonxinnghi,
};
