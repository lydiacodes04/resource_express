const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
// const User = require("../models/user");

const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      if (err.name === "11000") {
        return res.status(11000).send({ message: "duplicate error" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findBy(email)
    .orFail()
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      // found - comparing hashes
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    })
    .then((user) => res.status(200).send({ message: "Login successful" }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NONEXISTENT_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateProfile = (req, res) => {
  const { userId } = req.params;
  return User.findByOneAndUpdate(
    userId,
    { name: req.user.name, avatar: req.user.avatar },
    { new: true, upsert: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NONEXISTENT_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, createUser, login, getCurrentUser, updateProfile };

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: "incorrect email or password", err });
    });
};
