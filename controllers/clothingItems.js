const {
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");

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
  const owner = req.user._id;

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
        return res.status(409).send({ message: "Duplicate error" });
      }
      if (err.name === "401") {
        return res
          .status(UNAUTHORIZED_ERROR_CODE)
          .send({ message: "Unauthorized request" });
      }
      return res.status(201).send(clothingItem);
    });
};

const deleteItem = (req, res) => {
  clothingItem
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.toString() === req.user._id) {
        const error = new Error();
        error.name = "ForbiddenError";
        throw error;
      }
      return res.status(201).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ForbiddenError") {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "Access forbidden" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NONEXISTENT_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      }
      return res.status(200).send();
    });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
};
