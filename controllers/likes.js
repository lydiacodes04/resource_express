const clothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const InternalServerError = require("../errors/internal-server-error");

const likeItem = (req, res, next) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
        return;
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });

const disLikeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Requested resource not found"));
        return;
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(
        new InternalServerError(
          "An error occurred while processing your request",
        ),
      );
    });

module.exports = {
  likeItem,
  disLikeItem,
};
