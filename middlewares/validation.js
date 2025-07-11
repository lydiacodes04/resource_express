const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    imageUrl: Joi.string().required().uri(),
    category: Joi.string().required().valid("basic needs", "jobs", "education"),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserID = celebrate({
  params: Joi.object().keys({
    userID: Joi.string().required().length(24).hex(),
  }),
});

const validateClothingItemID = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().length(24).hex(),
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    avatar: Joi.string().uri(),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserInfo,
  validateUserLogin,
  validateUserID,
  validateClothingItemID,
  validateURL,
  validateUpdateUser,
};
