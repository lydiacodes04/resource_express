const User = require("../models/user");
//BAD_REQUEST_ERROR_CODE = 400;
//NONEXISTENT_ERROR_CODE = 404;
//  DEFAULT_ERROR_CODE = 500;

const { BAD_REQUEST_ERROR_CODE, NONEXISTENT_ERROR_CODE, DEFAULT_ERROR_CODE} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      // console.log(err.name);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NONEXISTENT_ERROR_CODE).send({ message: err.message });
      } else if (err.name === "CastingError") {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NONEXISTENT_ERROR_CODE).send({ message: err.message });
      } else if (err.name === "CastingError") {
        //handle cast error, bad request
        return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
