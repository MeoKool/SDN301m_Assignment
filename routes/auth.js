const authControllers = require("../Controllers/authControllers");
const middleWareControllers = require("../controllers/middleWareControllers");
const middleValidation = require("../controllers/middleWareValidation");

const router = require("express").Router();

router.post(
  "/createUser",
  middleValidation.validateCreateUser,
  authControllers.createUser
);
router.post(
  "/Login",
  middleValidation.validateLogin,
  authControllers.loginMember
);
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
router.post("/Logout", authControllers.logoutMember);

router.post("/refresh", authControllers.refreshToken);

module.exports = router;
