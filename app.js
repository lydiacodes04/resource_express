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
// commits 6/2-6/30
// commit 6/30, got search function to work and first item card to appear
// commit 7/1, formatted Item Cards so that the resources display like cards. Worked on display of Main a bit as well.
// commit 7/2, stopping point for the day. got /profile and / routes to work. Need to work on some formatting issues and messages to pop up for users.
// commit 7/3
// worked on final project: getting resource cards to appear horizontally,
// getting footer to remain at the bottom of the page without absolute positioning.
// "work on refining final project more; remove unnecessary components and code. improve alt tags"
// commit 7/4
// work on UI and responsive design
//commit 7/4, 2.0
// commit 7/4, final break before submit
