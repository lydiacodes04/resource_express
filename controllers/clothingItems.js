const getAllItems = (req, res) => {
  res.send({ message: "All clothing items" });
};

const createItem = (req, res) => {
  res.send("Item created");
};

const deleteItem = (req, res) => {
  if ((req.params._id = user._id)) {
    res.send("Item deleted");
  }
  return res.status(403).send({ message: "Access forbidden" });
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
};
