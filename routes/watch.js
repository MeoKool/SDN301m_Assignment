const watchesControllers = require("../controllers/watchControllers");

const router = require("express").Router();

router.get("/getAllWatches", watchesControllers.getAllWatches);

module.exports = router;
