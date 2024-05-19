const memberControllers = require("../controllers/memberController");

const router = require("express").Router();

router.post("/createUser", memberControllers.createUser);

module.exports = router;
