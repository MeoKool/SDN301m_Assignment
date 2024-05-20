const watchesControllers = require("../controllers/watchControllers");

const router = require("express").Router();

router.get("/getAllWatches", watchesControllers.getAllWatches);
router.get("/getWatchByName/:name", watchesControllers.getWatchByName);

module.exports = router;
