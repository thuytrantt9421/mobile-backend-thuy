const {Donxinnghi} = require('../models');

const userGetList = async (req, res) => {
    const {user} = req;
    try {
        const listDonxinnghi = Donxinnghi.findAll({
            where:{
                user_id:user.id
            }
        });
        res.status(201).send({listDonxinnghi});
    } catch (error) {
        res.status(500).send(error);
    }
}

const adminGetList = async (req, res) => {
    try {
        const listDonxinnghi = Donxinnghi.findAll();
        res.status(201).send({listDonxinnghi});
    } catch (error) {
        res.status(500).send(error);
    }
}

const userCreateDonxinnghi = async (req, res) => {
    const {user} = req;
    const {date} = req.body;
    try {
        const Donxinnghi = Donxinnghi.create({
            user_id:user.id,
            date:date,
            status:"wait"
        });
        res.status(201).send({Donxinnghi});
    } catch (error) {
        res.status(500).send(error);
    }
}

const adminAcceptDonxinnghi = async (req, res) => {
    try {
        const Donxinnghi = Donxinnghi.update({
            status:"accept"
        },{
            where : {
                id : req.params.id
            }
        });
        res.status(201).send({Donxinnghi});
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteDonxinnghi = async (req, res) => {
    try {
        const Donxinnghi = Donxinnghi.destroy({
            where : {
                id : req.params.id
            }
        });
        res.status(201).send({message:"thành công"});
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    userGetList,
    adminGetList,
    userCreateDonxinnghi,
    adminAcceptDonxinnghi,
    deleteDonxinnghi
}