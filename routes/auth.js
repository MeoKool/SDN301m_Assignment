const authControllers = require("../Controllers/authControllers");
const router = require("express").Router();

router.post("/createUser", authControllers.createUser);
router.post("/Login", authControllers.loginMember);

module.exports = router;
