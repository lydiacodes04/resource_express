const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// router.post("/", createUser);

// router.get("/", getUsers);

// router.get("/:userId", getCurrentUser);
// router.patch("/:userId", updateProfile);

router.get("/users/me", getCurrentUser);

router.patch("/users/me", updateProfile);

module.exports = router;
