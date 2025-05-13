const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const InternalServerError = require("../errors/internal-server-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");

const createUser = (req, res, next) => {
  const { name, avatarUrl, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar: avatarUrl, email, password: hash }),
    )
    .then(() => res.status(201).send({ name, avatar: avatarUrl, email }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError("a conflict error has occurred"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Authorization Required"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
        return;
      }
      // This was a "cast error" but also linked to "BadRequestError"
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
