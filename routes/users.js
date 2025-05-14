const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");

const { validateUpdateUser } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);

router.post(
  "/signup",
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
    },
  }),
  createUser,
);

router.patch("/me", validateUpdateUser, auth, updateProfile);

module.exports = router;
