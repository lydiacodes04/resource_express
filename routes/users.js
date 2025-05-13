const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateProfile);

module.exports = router;
