// controllers/auth.js

const auth = require("../routes/auth");

const {
  BAD_REQUEST_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  User.findBy(email)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NONEXISTENT_ERROR_CODE)
      //     .send({ message: "Requested resource not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(BAD_REQUEST_ERROR_CODE)
      //     .send({ message: "Invalid data" });
      // }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });

  res.send({ message: "Login successful" }); // change this to your actual login response
};

module.exports = {
  login,
};
