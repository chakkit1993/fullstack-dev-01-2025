const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.adminCheck = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
    });

    //console.log("user", user);

    if (user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "This account cannot admin access " });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};
