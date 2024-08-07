const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");
//CRUD

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
