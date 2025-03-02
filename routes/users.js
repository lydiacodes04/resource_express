const router = require("express").Router();
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);

router.post("/register", auth, createUser);

router.patch("/me", auth, updateProfile);

module.exports = router;
