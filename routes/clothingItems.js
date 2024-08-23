const router = require("express").Router();

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const clothingItemsController = require("../controllers/clothingItems");

const {
  createItem,
  getAllItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getAllItems);

const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.delete("/:itemId", auth, deleteItem);

module.exports = router;
