const router = require("express").Router();

const clothingItem = require("./clothingItems");

const users = require("./users");

const likes = require("./likes");

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

module.exports = router;
