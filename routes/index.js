const router = require("express").Router();

const clothingItem = require("./clothingItems");

const users = require("./users");

const likes = require("./likes");

const auth = require("./auth");

const { NONEXISTENT_ERROR_CODE } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", users);
router.use("/items", likes);
router.use("/", auth);

router.use((req, res) => {
  res
    .status(NONEXISTENT_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
