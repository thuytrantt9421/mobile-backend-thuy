const {Department} = require('../models');


const listDepartment = async (req, res) => {
    try {
        const departments = await Department.findAll(); 
        res.status(200).send({result:'OK', departments});
    } catch (error) {
        res.status(500).send(error);
    }
}

const createDepartment = async (req, res) => {
    const {name} = req.body;
    try {
        const newDepartment = await Department.create({name});
        res.status(200).send({result:'OK', newDepartment});
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateDepartment = async (req, res) => {
    const {name} = req.body;
    try {
        await Department.update({ name }, {
            where: {
                id : req.params.departmentId
            }
          });
          res.status(200).send({result:'OK'});
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteDepartment = async (req, res) => {
    try {
        await Department.destroy({
            where: {
                id : req.params.departmentId
            }
          });
        res.status(200).send({result:'OK'});
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    listDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}