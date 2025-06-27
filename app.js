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
// 5/19-5/31
// no commits saved for 6/1 even though I did make commits to the branch I was working on
// commits 6/2-6/23
// commit 6/24
// commit 6/25
// commit 6/26
