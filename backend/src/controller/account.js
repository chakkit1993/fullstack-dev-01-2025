const prisma = require("../utils/prisma");

exports.createAccount = async (req, res) => {
  //console.log(req.query);

  try {
    const { displayName, userId } = req.body;
    const account = await prisma.account.create({
      data: {
        userId: userId,
        displayName: displayName,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ account: account, message: "create account successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create account " });
  }
};

exports.getAccount = async (req, res) => {
  //console.log(req.query);
  try {
    let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
    currentPage = currentPage === 0 ? 1 : currentPage;

    let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
    let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
    let pageSize = limit;
    let skip = (currentPage - 1) * limit;
    const total = await prisma.account.count();
    const accounts = await prisma.account.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });

    let totalPages = Math.ceil(total / pageSize);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "accounts list successfully",
      data: accounts,
      total,
      limit,
      currentPage: currentPage,
      prevPage: prevPage,
      totalPages: totalPages === Infinity ? 1 : totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get account " });
  }
};
exports.getAccountById = async (req, res) => {
  try {
    //console.log(req.query);
    const id = req.params.id;
    const account = await prisma.account.findFirst({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ account: account, message: "get account successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get account by id " });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //console.log("delete id", req.params.id);
    const id = req.params.id;
    const account = await prisma.account.delete({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "delete account successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete account" });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        displayName: req.body.categoryName,
      },
    });

    return res
      .status(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ account: account, message: "update account successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update account" });
  }
};
