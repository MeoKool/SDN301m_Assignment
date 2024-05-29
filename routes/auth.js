const authControllers = require("../Controllers/authControllers");
const router = require("express").Router();

router.post("/createUser", authControllers.createUser);
router.post("/Login", authControllers.loginMember);
router.post("/changePassword", authControllers.changePassword);
router.put("/updateMember/:memberName", authControllers.updateMember);
router.get("/getByMemberName/:memberName", authControllers.getByMemberName);
module.exports = router;
