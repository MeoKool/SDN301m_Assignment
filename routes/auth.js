const authControllers = require("../Controllers/authControllers");
const router = require("express").Router();

router.post("/createUser", authControllers.createUser);

module.exports = router;
