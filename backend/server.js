const express = require("express");
const cors = require("cors");
const app = express();

//const dotenv = require("dotenv");

//dotenv.config(); // Load the environment variables
//console.log(`The connection URL is ${process.env.DATABASE_URL}`);

const authRouter = require("./src/routes/auth");
const categoryRouter = require("./src/routes/category");
const transactionRouter = require("./src/routes/transaction");
const imageRouter = require("./src/routes/image");

app.use(cors());
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static("src/uploads"));
const PORT = 8080;

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello, Word!" });
});

app.use("/api", imageRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
