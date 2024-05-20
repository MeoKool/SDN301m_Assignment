const Watches = require("../models/Watches");

const watchesControllers = {
  //getAllWatches
  getAllWatches: async (req, res) => {
    try {
      const users = await Watches.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // getWatchByName
  getWatchByName: async (req, res) => {
    try {
      const watch = await Watches.findOne({ watchName: req.params.name });
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = watchesControllers;
