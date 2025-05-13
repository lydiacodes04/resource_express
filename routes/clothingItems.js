const router = require("express").Router();

const {
  validateClothingItem,
  validateClothingItemID,
} = require("../middlewares/validation");

const {
  createItem,
  getAllItems,
  deleteItem,
} = require("../controllers/clothingItems");

const auth = require("../middlewares/auth");

router.get("/", getAllItems);

router.post("/", auth, validateClothingItem, createItem);

router.delete("/:itemId", auth, validateClothingItemID, deleteItem);

module.exports = router;
