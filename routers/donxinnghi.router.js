const express = require("express");
const {
  userGetList,
  adminGetList,
  userCreateDonxinnghi,
  adminAcceptDonxinnghi,
  deleteDonxinnghi,
  adminRefuseDonxinnghi,
} = require("../controllers/donxinnghi.controller");
const { authenticate } = require("../middleware/authenticate");
const { authorize } = require("../middleware/authorize");

const donxinnghiRouter = express.Router();

donxinnghiRouter.get("/userGetList", authenticate, userGetList);
donxinnghiRouter.get("/adminGetList", authenticate, authorize, adminGetList);
donxinnghiRouter.post("/createDonxinnghi", authenticate, userCreateDonxinnghi);
donxinnghiRouter.put(
  "/acceptDonxinnghi/:id",
  authenticate,
  authorize,
  adminAcceptDonxinnghi
);
donxinnghiRouter.put(
  "/refuseDonxinnghi/:id",
  authenticate,
  authorize,
  adminRefuseDonxinnghi
);
donxinnghiRouter.delete(
  "/deleteDonxinnghi/:id",
  authenticate,
  deleteDonxinnghi
);

module.exports = { donxinnghiRouter };
