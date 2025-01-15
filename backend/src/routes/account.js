// import ....
const express = require("express");
const {
  getAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
  createAccount,
} = require("../controller/account");
const { authCheck } = require("../middleware/authCheck");
const { adminCheck } = require("../middleware/adminCheck");
const accountRouter = express.Router();

accountRouter.get("/accounts", authCheck, adminCheck, getAccount);
accountRouter.get("/account/:id", authCheck, getAccountById);
accountRouter.post("/account/:id", authCheck, createAccount);
accountRouter.put("/account/:id", authCheck, updateAccount);
accountRouter.delete("/account/:id", authCheck, adminCheck, deleteAccount);

module.exports = accountRouter;
