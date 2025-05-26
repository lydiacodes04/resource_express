require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const cors = require("cors");

const { errors } = require("celebrate");

const errorHandler = require("./errors/error-handler");

const { requestLogger, errorLogger } = require("./errors/logger");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const routes = require("./routes");

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes); // regular routes

app.use(errorLogger);

app.use(errors()); // celebrate error handler

app.use(errorHandler); // general error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//project 15 approved!
//commit 5/19
// commit 5/20
// commit 5/21
// commit 5/22
// commit 5/23
// commit 5/24
