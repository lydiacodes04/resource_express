const router = require("express").Router();

const { likeItem, disLikeItem } = require("../controllers/likes");

const auth = require("../middlewares/auth");

const { validateClothingItemID } = require("../middlewares/validation");

router.put("/:itemId/likes", auth, validateClothingItemID, likeItem);

router.delete("/:itemId/likes", auth, validateClothingItemID, disLikeItem);

module.exports = router;
