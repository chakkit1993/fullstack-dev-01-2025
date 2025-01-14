const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.authCheck = async (req, res, next) => {
  try {
    //code
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).json({ message: "No Token, Authorization" });
    }
    const token = headerToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    //console.log("decode", decode);
    req.user = decode;

    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "This account cannot access" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};
