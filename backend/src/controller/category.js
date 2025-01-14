const prisma = require("../utils/prisma");
exports.getCategory = async (req, res) => {
  //console.log(req.query);

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
};

exports.createCategory = async (req, res) => {
  //console.log(req.body);
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
};

exports.deleteCategory = async (req, res) => {
  //console.log("delete id", req.params.id);
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
};

exports.updateCategory = async (req, res) => {
  // const id = req.params.id;
  // const category = await prisma.category.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });

  return res
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ message: "category update" });
};
