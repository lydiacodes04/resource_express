const router = require("express").Router();
const { likeItem, unlikeItem } = require("../controllers/likes");

// PUT /items/:itemId/likes — like an item
router.put("/:itemId/likes", likeItem);

// DELETE /items/:itemId/likes — unlike an item
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;