const middleWareControllers = require("../controllers/middleWareControllers");
const watchesControllers = require("../controllers/watchControllers");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getAllWatches", watchesControllers.getAllWatches);
router.get("/getWatchByName/:name", watchesControllers.getWatchByName);
router.post(
  "/createWatch",
  middleWareControllers.verifyAdmin,
  upload.single("image"),
  watchesControllers.createWatch
);
router.get("/getByIdWatches/:id/", watchesControllers.getByIdWatches);
router.get(
  "/searchWatches/:name",
  middleWareControllers.verifyToken,
  watchesControllers.searchWatches
);
module.exports = router;
