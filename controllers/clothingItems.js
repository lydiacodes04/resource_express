const { BAD_REQUEST_ERROR_CODE } = require("../utils/errors");

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
  res.send("Item created");
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
