const router = require("express").Router();

const clothingItem = require("./clothingItems");

router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;

//OLD code from Kevin's video
// const router = require("express").Router();

// const userRouter = require("./users");

// router.use("/users", userRouter);

// module.exports = router;
