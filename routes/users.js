const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users.js");


//Create
router.post("/", createUser);

// GET /users — returns all users
router.get("/", getUsers);

//GET /users/:userId - returns a user by _id
router.get("/:userId", getUser);


// POST /users — creates a new user

module.exports = router;
