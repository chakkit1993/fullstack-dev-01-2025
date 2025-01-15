const prisma = require("../utils/prisma");
exports.getUser = async (req, res) => {
  //console.log(req.query);

  try {
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
      message: "get user list successfully",
      data: users,
      total,
      limit,
      currentPage: currentPage,
      prevPage: prevPage,
      totalPages: totalPages === Infinity ? 1 : totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get users  " });
  }
};

exports.getUserById = async (req, res) => {
  try {
    //console.log("delete id", req.params.id);
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ user: user, message: "get user successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user " });
  }
};

exports.deleteUser = async (req, res) => {
  //console.log("delete id", req.params.id);
  try {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ message: "delete user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user " });
  }
};

exports.updateUser = async (req, res) => {
  try {
    //console.log("delete id", req.params.id);
    const id = req.params.id;
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        displayName: req.body.displayName,
        //password: req.body.password,
        role: req.body.role,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ message: "update user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user " });
  }
};
