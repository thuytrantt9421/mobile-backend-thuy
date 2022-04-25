const express = require('express');
const { registerUser } = require('../controllers/auth.controller');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/test', (req, res) => {
    res.send('hello');
})

module.exports = {
    userRouter
}