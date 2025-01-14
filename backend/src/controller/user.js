const prisma = require("../utils/prisma");
exports.getUser = async (req, res) => {
  console.log(req.query);

  let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
  currentPage = currentPage === 0 ? 1 : currentPage;

  let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
  let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
  let pageSize = limit;
  let skip = (currentPage - 1) * limit;
  const total = await prisma.user.count();
  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
    orderBy: {
      id: "desc",
    },
  });

  let totalPages = Math.ceil(total / pageSize);

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    message: "user list",
    data: users,
    total,
    limit,
    currentPage: currentPage,
    prevPage: prevPage,
    totalPages: totalPages === Infinity ? 1 : totalPages,
  });
};
