const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// router.post("/", createUser);

// router.get("/", getUsers);

// router.get("/:userId", getCurrentUser);
// router.patch("/:userId", updateProfile);

const auth = require("../middlewares/auth");

router.get("/users/me", auth, getCurrentUser);

router.patch("/users/me", auth, updateProfile);

module.exports = router;
