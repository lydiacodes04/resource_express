require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const cors = require("cors");

const BadRequestError = require("./errors/bad-request-error");
const NotFoundError = require("./errors/not-found-error");
const UnauthorizedError = require("./errors/unauthorized-error");
const ForbiddenError = require("./errors/forbidden-error");
const ConflictError = require("./errors/conflict-error");

const { requestLogger, errorLogger } = require("./errors/logger");

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

app.use(requestLogger);

app.use(routes); //regular routes

app.use(errorLogger);

app.use(errors()); // celebrate error handler

//404 handler
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

//general error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Handle celebrate validation errors
  if (err.joi) {
    return res.status(400).json({ message: err.joi.message });
  }

  // Handle your custom errors
  if (err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }

  // Default error
  return res.status(500).json({
    message: "An error occurred on the server",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
