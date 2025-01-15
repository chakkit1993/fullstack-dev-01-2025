const prisma = require("../utils/prisma");

exports.getCategoryById = async (req, res) => {
  //console.log(req.query);
  const id = req.params.id;
  const category = await prisma.category.findFirst({
    where: {
      id: Number(id),
    },
  });
  return res
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ category: category, message: "category successfully" });
};

exports.getCategory = async (req, res) => {
  //console.log(req.query);

  try {
    let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
    currentPage = currentPage === 0 ? 1 : currentPage;

    let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
    let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
    let pageSize = limit;
    let skip = (currentPage - 1) * limit;
    const total = await prisma.category.count();
    const categories = await prisma.category.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });

    let totalPages = Math.ceil(total / pageSize);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "category list",
      data: categories,
      total,
      limit,
      currentPage: currentPage,
      prevPage: prevPage,
      totalPages: totalPages === Infinity ? 1 : totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get category " });
  }
};

exports.createCategory = async (req, res) => {
  //console.log(req.body);
  try {
    const { categoryName } = req.body;
    const category = await prisma.category.create({
      data: {
        displayName: categoryName,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "category create", category: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category " });
  }
};

exports.deleteCategory = async (req, res) => {
  //console.log("delete id", req.params.id);
  try {
    const id = req.params.id;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "category delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category " });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        displayName: req.body.categoryName,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "category update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category " });
  }
};
