const router = require("express").Router();
const clothingItem = require("./clothingItems");
const users = require("./users");

const { NONEXISTENT_ERROR_CODE } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", users);

router.use((req, res) => {
  res.status(NONEXISTENT_ERROR_CODE).send({ message: "Router not found" });
});

module.exports = router;
