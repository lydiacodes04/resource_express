const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// router.post("/", createUser);

// router.get("/", getUsers);

// router.get("/:userId", getCurrentUser);
// router.patch("/:userId", updateProfile);

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateProfile);

module.exports = router;
