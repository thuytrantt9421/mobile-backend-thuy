const {Position} = require('../models');

const listPositon = async (req, res) =>{
    try {
        const positons = await Position.findAll(); 
        res.status(200).send({positons});
    } catch (error) {
        res.status(500).send(error);
    }
}

const createPosition = async (req, res) => {
    const {name} = req.body;
    try {
        const newPosition = await Position.create({name});
        res.status(200).send({result:'OK', newPosition});
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatePosition = async (req, res) => {
    const {name} = req.body;
    try {
        await Position.update({ name }, {
            where: {
                id : req.params.positionId
            }
          });
          res.status(200).send({result:'OK'});
    } catch (error) {
        res.status(500).send(error);
    }
}

const deletePosition = async (req, res) => {
    try {
        await Position.destroy({
            where: {
                id : req.params.positionId
            }
          });
        res.status(200).send({result:'OK'});
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    listPositon,
    createPosition,
    updatePosition,
    deletePosition
}