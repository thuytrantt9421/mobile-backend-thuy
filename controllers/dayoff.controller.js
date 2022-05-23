const {Dayoff} = require('../models');


const getDayoff = async (req, res) => {
    try {
        const listDayoff = await Dayoff.findAll();
        res.status(201).send({listDayoff});
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getDayoff}