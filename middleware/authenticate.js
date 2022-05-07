const{User} = require('../models');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("token");
        const decode = jwt.verify(token, "pikachu");
        if (decode){
            req.user = decode;
            return next();
        }
    } catch (error) {
        res.status(500).send("bạn cần đăng nhập");
    }
}

module.exports = {
    authenticate
}