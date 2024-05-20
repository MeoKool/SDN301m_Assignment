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
};

module.exports = watchesControllers;
