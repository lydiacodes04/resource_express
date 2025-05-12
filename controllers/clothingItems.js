const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");
const InternalServerError = require("../errors/internal-server-error");

const clothingItem = require("../models/clothingItem");

const getAllItems = (req, res, next) => {
  clothingItem
    .find()
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

const createItem = (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, imageUrl, weather, owner })
    .then((newClothingItem) => res.status(201).send(newClothingItem))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

const deleteItem = (req, res, next) => {
  clothingItem
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Access forbidden");
      }
      return item.deleteOne();
    })
    .then((deletedItem) => res.status(200).send(deletedItem)) // Changed to 200 for DELETE
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
};
