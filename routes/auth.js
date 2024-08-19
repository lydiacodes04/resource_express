// routes/auth.js
const router = require("express").Router();
const { login } = require("../controllers/auth"); // require the login controller

router.post("/signin", login);

module.exports = router;
