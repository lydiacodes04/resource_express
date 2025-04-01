const { celebrate, Joi } = require("celebrate");

router.post(
  "/posts",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required().min(2).max(30),
      text: Joi.string().required().min(2),
    }),
  }),
  createPost,
);

router.delete(
  "/:postId",
  celebrate({
    // validate parameters
    params: Joi.object().keys({
      postId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object().keys({
      // validate headers
    }),
    query: Joi.object().keys({
      // validate query
    }),
  }),
  deletePost,
);

router.delete(
  "/:postId",
  celebrate({
    headers: Joi.object()
      .keys({
        // validate headers
      })
      .unknown(true),
  }),
  deletePost,
);
