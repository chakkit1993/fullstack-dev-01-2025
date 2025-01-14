// import ....
const express = require("express");
const { getUser } = require("../../controller/user");

const userRouter = express.Router();

userRouter.get("/user", getUser);

module.exports = userRouter;
