const router = require("express").Router();

const clothingItem = require("./clothingItems");

const users = require("./users");

const { NONEXISTENT_ERROR_CODE } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", users);

router.use((req, res) => {
  res
    .status(NONEXISTENT_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

// const likes = require("./likes");
// router.use("/items", likes);

module.exports = router;
