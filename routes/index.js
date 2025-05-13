const router = require("express").Router();

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

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
  return;
});

module.exports = router;
