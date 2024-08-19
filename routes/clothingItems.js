const router = require("express").Router();

const clothingItemsController = require("../controllers/clothingItems");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.delete("/:itemId", deleteItem);

router.get("/", clothingItemsController.getAllItems);

module.exports = router;
