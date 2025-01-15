// import ....
const express = require("express");
const {
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionByAccount,
  getTransactionByCategory,
  getTransactionById,
} = require("../controller/transaction");
const { authCheck } = require("../middleware/authCheck");
const { upload } = require("../utils/upload");
const transactionRouter = express.Router();

transactionRouter.get("/transactions", authCheck, getTransaction);
transactionRouter.get(
  "/transaction/account/:id",
  authCheck,
  getTransactionByAccount
);
transactionRouter.get(
  "/transaction/category/:id",
  authCheck,
  getTransactionByCategory
);
transactionRouter.get("/transaction/:id", authCheck, getTransactionById);
transactionRouter.post("/transaction", authCheck, upload, createTransaction);
transactionRouter.delete("/transaction/:id", authCheck, deleteTransaction);
transactionRouter.put("/transaction/:id", authCheck, updateTransaction);

module.exports = transactionRouter;
