const brandControllers = require("../controllers/brandControllers");
const middleWareControllers = require("../controllers/middleWareControllers");
const router = require("express").Router();

router.post(
  "/createBrand",
  middleWareControllers.verifyToken,
  brandControllers.createBrand
);
router.get("/getAllBrands", brandControllers.getAllBrands);
router.get(
  "/getByIDBrands/:id",
  middleWareControllers.verifyToken,
  brandControllers.getByIDBrands
);
module.exports = router;
