const express = require('express');
const { userRouter } = require('./auth.router');

const rootRouter = express.Router();

rootRouter.use('/auth', userRouter);
rootRouter.use('/', (req, res) => {
    res.send("hello");
});

module.exports= {rootRouter}