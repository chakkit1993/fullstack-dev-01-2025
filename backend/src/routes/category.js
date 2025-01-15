// import ....
const express = require("express");
const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} = require("../controller/category");
const { authCheck } = require("../middleware/authCheck");
const categoryRouter = express.Router();

categoryRouter.get("/categories", authCheck, getCategory);
categoryRouter.get("/category/:id", authCheck, getCategoryById);
categoryRouter.post("/category", authCheck, createCategory);
categoryRouter.delete("/category/:id", authCheck, deleteCategory);
categoryRouter.put("/category/:id", authCheck, updateCategory);
module.exports = categoryRouter;
