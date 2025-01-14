// import ....
const express = require("express");
const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category");
const { authCheck } = require("../middleware/authCheck");
const categoryRouter = express.Router();

categoryRouter.get("/category", authCheck, getCategory);
categoryRouter.post("/category", authCheck, createCategory);
categoryRouter.delete("/category/:id", authCheck, deleteCategory);
categoryRouter.put("/category/:id", authCheck, updateCategory);
module.exports = categoryRouter;
