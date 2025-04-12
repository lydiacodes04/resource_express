const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const cors = require("cors");

// const errorHandler = require("./middlewares/error-handler");

const { errors } = require("celebrate");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const routes = require("./routes");

app.use(express.json());

app.use(routes);

// app.use(requestLogger);
// app.use(routes);

// app.use(errorLogger); // enabling the error logger

// app.use(errors()); // celebrate error handler
// app.use(errorHandler); //centralized error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//connecting project to Google Cloud on 4/7

//next steps:
//1. Install Node.js to launch the application
//working on this 4/9
// successfully installed Node.js on VM with assistance from Dot

// 2. Install MongoDB so the server can interact with the database
// successfully installed MongoDB

// 3. Install Git to be able to upload our code to the server
// successfully installed Git

//committed to commits
//4. Launch server
//done on 4/12
