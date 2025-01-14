//accoutId  = 35238099-94e5-4481-8b7d-43e703bb0d6a
const prisma = require("../utils/prisma");
const fs = require("fs");

function ckeckrude(data) {
  //block คำหยาบ และประโยคที่จะนำมาแทนที่
  var wordrude = new Array(
    "fuck",
    "dog",
    "มึง",
    "idot",
    "กู",
    "ควย",
    "ปี้",
    "เหี้ย",
    "สัด",
    "เย็ด",
    "หี",
    "แม่ง",
    "แตด"
  );
  var wordchange = "***";

  for (n = 0; n < wordrude.length; n++) {
    pattern = new RegExp(wordrude[n], "gi");
    data = data.replace(pattern, wordchange);
  }
  return data;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

exports.createTransaction = async (req, res) => {
  ///(req.body);
  var _data = req.body;

  const { amount, note, accountId, categoryId } = req.body;

  //console.log(req.file);
  if (req.file) {
    _data.file = req.file;
  } else {
    _data.file = { filename: "no-image.png" };
  }

  //check word
  const _note = ckeckrude(note);
  //console.log(_note);

  const trans = await prisma.transaction.create({
    data: {
      amount: amount,
      note: _note,
      imageUrl: _data.file.filename,
      categoryId: Number(categoryId),
      accountId: accountId,
    },
  });

  return res
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .json({ message: "transaction create", transaction: trans });
};

exports.deleteTransaction = async (req, res) => {
  //console.log("delete id", req.params.id);
  const id = req.params.id;
  const transaction = await prisma.transaction.delete({
    where: {
      id: id,
    },
  });

  if (transaction?.imageUrl) {
    await fs.unlink("./src/uploads/" + transaction.imageUrl, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Remove success");
      }
    });
  }

  return res
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .json({ message: "transaction delete" });
};

exports.updateTransaction = async (req, res) => {
  //console.log("delete id", req.params.id);
  const id = req.params.id;
  const transaction = await prisma.transaction.delete({
    where: {
      id: Number(id),
    },
  });

  return res
    .status(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .json({ message: "transaction delete" });
};

exports.getTransaction = async (req, res) => {
  var currentTime = new Date();
  if (!req.query.page) {
    req.query.page = 1;
  }
  if (!req.query.limit) {
    req.query.limit = 10;
  }
  if (!req.query.year) {
    req.query.year = currentTime.getFullYear();
  }
  if (!req.query.month) {
    req.query.month = currentTime.getMonth() + 1;
  }

  let month = req.query.month;
  let year = req.query.year;

  //console.log(req.query);

  let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
  currentPage = currentPage <= 0 ? 1 : currentPage;
  let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
  let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
  let pageSize = limit;
  let skip = (currentPage - 1) * limit;
  const total = await prisma.transaction.count();
  const days = daysInMonth(month, year);
  const tranasctions = await prisma.transaction.findMany({
    skip: skip,
    take: pageSize,
    include: {
      account: true,
    },
    orderBy: {
      id: "desc",
    },
    where: {
      createdAt: {
        lte: String(new Date(`${year}-${month}-${days}`).toISOString()), // "2022-01-30T00:00:00.000Z" // End of date range
        gte: String(new Date(`${year}-${month}-01`).toISOString()), // "2022-01-15T00:00:00.000Z" // Start of date range
      },
    },
  });

  let totalPages = Math.ceil(total / pageSize);

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    message: "tranasction list",
    data: tranasctions,
    total,
    limit,
    currentPage: currentPage,
    prevPage: prevPage,
    totalPages: totalPages === Infinity ? 1 : totalPages,
  });
};

exports.getTransactionByAccount = async (req, res) => {
  //console.log("account id", req.params.id);
  let accountId = req.params.id;
  let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
  currentPage = currentPage <= 0 ? 1 : currentPage;
  let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
  let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
  let pageSize = limit;
  let skip = (currentPage - 1) * limit;
  const total = await prisma.transaction.count();
  const tranasctions = await prisma.transaction.findMany({
    skip: skip,
    take: pageSize,
    include: {
      account: true,
    },
    where: {
      accountId: accountId,
    },
    orderBy: {
      id: "desc",
    },
    // where: {
    //   createdAt: {
    //     lte: String(new Date("2022-01-30").toISOString()), // "2022-01-30T00:00:00.000Z" // End of date range
    //     gte: String(new Date("2022-01-15").toISOString()), // "2022-01-15T00:00:00.000Z" // Start of date range
    //   },
    // },
  });

  let totalPages = Math.ceil(total / pageSize);

  const account = await prisma.account.findMany({
    skip: skip,
    take: pageSize,
    where: {
      accountId: tranasctions.accountId,
    },
    orderBy: {
      id: "desc",
    },
    // where: {
    //   createdAt: {
    //     lte: String(new Date("2022-01-30").toISOString()), // "2022-01-30T00:00:00.000Z" // End of date range
    //     gte: String(new Date("2022-01-15").toISOString()), // "2022-01-15T00:00:00.000Z" // Start of date range
    //   },
    // },
  });

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    message: "tranasction list",
    data: tranasctions,
    account: account,
    total,
    limit,
    currentPage: currentPage,
    prevPage: prevPage,
    totalPages: totalPages === Infinity ? 1 : totalPages,
  });
};

exports.getTransactionByCategory = async (req, res) => {
  //console.log("categoryId ", req.params.id);
  let categoryId = req.params.id;

  let currentPage = req.query.page === undefined ? 1 : Number(req.query.page);
  currentPage = currentPage <= 0 ? 1 : currentPage;
  let prevPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
  let limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
  let pageSize = limit;
  let skip = (currentPage - 1) * limit;
  const total = await prisma.transaction.count();
  const tranasctions = await prisma.transaction.findMany({
    skip: skip,
    take: pageSize,
    include: {
      account: true,
    },
    when: {
      categoryId: categoryId,
    },
    orderBy: {
      id: "desc",
    },
    // where: {
    //   createdAt: {
    //     lte: String(new Date("2022-01-30").toISOString()), // "2022-01-30T00:00:00.000Z" // End of date range
    //     gte: String(new Date("2022-01-15").toISOString()), // "2022-01-15T00:00:00.000Z" // Start of date range
    //   },
    // },
  });

  let totalPages = Math.ceil(total / pageSize);

  const account = await prisma.account.findMany({
    skip: skip,
    take: pageSize,
    where: {
      accountId: tranasctions.accountId,
    },
    orderBy: {
      id: "desc",
    },
    // where: {
    //   createdAt: {
    //     lte: String(new Date("2022-01-30").toISOString()), // "2022-01-30T00:00:00.000Z" // End of date range
    //     gte: String(new Date("2022-01-15").toISOString()), // "2022-01-15T00:00:00.000Z" // Start of date range
    //   },
    // },
  });

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    message: "tranasction list",
    data: tranasctions,
    account: account,
    total,
    limit,
    currentPage: currentPage,
    prevPage: prevPage,
    totalPages: totalPages === Infinity ? 1 : totalPages,
  });
};
