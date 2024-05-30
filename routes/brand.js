const brandControllers = require("../controllers/brandControllers");
const router = require("express").Router();

router.post("/createBrand", brandControllers.createBrand);
router.get("/getAllBrands", brandControllers.getAllBrands);
module.exports = router;
