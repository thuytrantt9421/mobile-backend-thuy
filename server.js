const express = require("express");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const { QueryTypes } = require("sequelize");
const app = express();
const port = 3000;

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", rootRouter);

// app.get('/api/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT, async () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully 1`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// const connect = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// connect();
