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
  // createWatch
  createWatch: async (req, res) => {
    const imagePath = req.file ? req.file.path : "";
    const watch = await new Watches({
      watchName: req.body.watchName,
      image: imagePath,
      price: req.body.price,
      Automatic: req.body.Automatic,
      watchDescription: req.body.watchDescription,
      brand: req.body.brand,
    });
    try {
      const newWatch = await watch.save();
      res.status(200).json(newWatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //getByIDWatches
  getByIdWatches: async (req, res) => {
    try {
      const watch = await Watches.findById(req.params.id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //SearchWatches
  searchWatches: async (req, res) => {
    try {
      const watches = await Watches.find({
        watchName: { $regex: req.params.name, $options: "i" },
      });
      if (watches.length === 0) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json(watches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = watchesControllers;
