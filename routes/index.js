const router = require("express").Router();

const { errors } = require("celebrate");
const clothingItem = require("./clothingItems");

const users = require("./users");

const likes = require("./likes");


const NotFoundError = require("../errors/not-found-error");

const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

const { createUser, login } = require("../controllers/users");

router.post("/signin", validateUserLogin, login);

router.post("/signup", validateUserInfo, createUser);

router.use("/items", clothingItem);
router.use("/users", users);
router.use("/items", likes);

router.use(errors());

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
  
});

router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

module.exports = router;
