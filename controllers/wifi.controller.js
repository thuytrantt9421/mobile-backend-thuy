const {Wifi} = require('../models');

const getListWifi = async (req, res) => {
    try {
        const listWifi = await Wifi.findAll();
        res.status(201).send({listWifi});
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {getListWifi}