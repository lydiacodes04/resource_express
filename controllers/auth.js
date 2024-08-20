const { DEFAULT_ERROR_CODE } = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  User.findBy(email)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });

  res.send({ message: "Login successful" }); // change this to your actual login response
};

module.exports = {
  login,
};
