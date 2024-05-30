const brandControllers = require("../controllers/brandControllers");
const router = require("express").Router();

router.post("/createBrand", brandControllers.createBrand);
router.get("/getAllBrands", brandControllers.getAllBrands);
router.get("/getByIDBrands/:id", brandControllers.getByIDBrands);
module.exports = router;
