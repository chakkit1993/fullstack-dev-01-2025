const express = require("express");
const { getImage } = require("../controller/image");
const imageRouter = express.Router();

imageRouter.get("/image/:id", getImage);

module.exports = imageRouter;
