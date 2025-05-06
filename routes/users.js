const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);

router.post(
  "/register",
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
    },
  }),
  auth,
  createUser,
);

router.patch("/me", auth, updateProfile);

module.exports = router;
