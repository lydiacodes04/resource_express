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
// commit 5/25
// commit 5/26
// commit 5/27
// commit 5/28
// commit 5/29
// commit 5/30; review project requirements and make plan for this weekend.
// commit 5/31
// no commits saved for 6/1 even though I did make commits to the branch I was working on
// commit 6/2
// commit 6/3
// commit 6/4
// commit 6/5
// commit 6/6
// commit 6/7
// commit 6/8 did not save! :( )
// commit 6/9
// commit 6/10 worked with Dot to get page to show again (pathing issue)
// commit 6/11 cont working on final project
// commit 6/12
// commit 6/13
// commit 6/14
// commit 6/15
// commit 6/16 worked on project for about 3hr. got website showing.
// commit 6/17
// commit 6/18
// commit 6/19 work on connecting API. still working. done for the night.
// commit 6/20 today I am going to try to set up the MVP for the final project.
// Basically just want to have something show up for my frontend...(later on 6/20) I did it!
// Frontend is showing up. Starting to draft the layout.
