// import ....
const express = require("express");
const {
  updateUser,
  deleteUser,
  getUserById,
  getUser,
} = require("../controller/user");
const { authCheck } = require("../middleware/authCheck");
const { adminCheck } = require("../middleware/adminCheck");

const userRouter = express.Router();

userRouter.get("/users", authCheck, adminCheck, getUser);
userRouter.get("/user/:id", authCheck, getUserById);
userRouter.put("/user/:id", authCheck, adminCheck, updateUser);
userRouter.delete("/user/:id", authCheck, adminCheck, deleteUser);
module.exports = userRouter;
