const { BAD_REQUEST_ERROR_CODE } = require("../utils/errors");

const clothingItem = require("../models/clothingItem");

const getAllItems = (req, res) => {
  const { clothingItems } = req.body;
  req
    .find(clothingItems)
    .orFail()
    .then(() => res.status(201).send({ clothingItems }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res.status(201).send(clothingItems);
    });
};

const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  const { owner } = req.user._id;

  clothingItem
    .create(name, imageUrl, weather, owner)
    .then(() => res.status(201).send(name, imageUrl, weather, owner))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      if (err.name === 11000) {
        return res.status(409).send({ message: "duplicate error" });
      }
      return res.status(201).send(clothingItem);
    });
};

const deleteItem = (req, res) => {
  if ((req.params._id = req.user._id)) {
    res.send("Item deleted");
  }
  return res.status(403).send({ message: "Access forbidden" });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
};
