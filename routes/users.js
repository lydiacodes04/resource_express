const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const { validateUpdateUser } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

router.patch("/me", auth, validateUpdateUser, updateProfile);

router.get("/me", auth, getCurrentUser);

module.exports = router;
