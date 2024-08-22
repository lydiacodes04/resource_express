const router = require("express").Router();

const clothingItemsController = require("../controllers/clothingItems");

const {
  createItem,
  getAllItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getAllItems);

router.delete("/:itemId", deleteItem);

module.exports = router;
