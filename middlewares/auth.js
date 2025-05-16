const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const UnauthorizedError = require("../errors/unauthorized-error");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(
      new UnauthorizedError(
        "Authorization Required: authorization header is missing or malformed",
      ),
    );
    return;
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    next(new UnauthorizedError("Authorization Required: invalid token"));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
