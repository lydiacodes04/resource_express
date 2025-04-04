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
