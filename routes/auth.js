const authControllers = require("../Controllers/authControllers");
const middleWareControllers = require("../controllers/middleWareControllers");
const router = require("express").Router();

router.post("/createUser", authControllers.createUser);
router.post("/Login", authControllers.loginMember);
router.post(
  "/changePassword",
  middleWareControllers.verifyToken,
  authControllers.changePassword
);
router.put(
  "/updateMember/:memberName",
  middleWareControllers.verifyToken,
  authControllers.updateMember
);
router.get("/getByMemberName/:memberName", authControllers.getByMemberName);
router.get(
  "/getAllMembers",
  middleWareControllers.verifyAdmin,
  authControllers.getAllMembers
);
module.exports = router;
