const watchesControllers = require("../controllers/watchControllers");
const router = require("express").Router();

router.get("/getAllWatches", watchesControllers.getAllWatches);
router.get("/getWatchByName/:name", watchesControllers.getWatchByName);
router.post("/createWatch", watchesControllers.createWatch);

module.exports = router;
