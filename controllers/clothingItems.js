const getAllItems = (req, res) => {
  // Example function to get all items
  res.send({ message: "All clothing items" });
};

const createItem = (req, res) => {
  res.send("Item created");
};

const deleteItem = (req, res) => {
  res.send("Item deleted");
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
};
