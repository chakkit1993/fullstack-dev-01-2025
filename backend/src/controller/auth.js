const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(username, password);
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    //console.log("user", user);
    if (user) {
      const validated = await bcrypt.compare(password, user.password);
      //console.log("validated", validated);
      if (validated) {
        let token = jwt.sign({ username: username }, secretKey);
        return res
          .status(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .json({ message: "Login Success", token: token });
      }
    } else {
      return res
        .status(400)
        .header("Content-Type", "application/json; charset=utf-8")
        .json({ message: "Not Found User" });
    }
  } catch (e) {
    return res
      .status(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ message: "Login Failed" });
  }

  return res
    .status(401)
    .header("Content-Type", "application/json; charset=utf-8")
    .json({ message: "Login Failed" });
};

exports.register = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const passHash = await bcrypt.hash(password, 10);
    //console.log("hash", passHash);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: passHash,
        displayName: displayName,
      },
    });

    const account = await prisma.account.create({
      data: {
        displayName: String(displayName),
        userId: user.id,
      },
    });

    return res
      .status(201)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ message: "Create User Successfully" });
  } catch (e) {
    return res
      .status(400)
      .header("Content-Type", "application/json; charset=utf-8")
      .json({ message: "Create User Failed" });
  }
};
