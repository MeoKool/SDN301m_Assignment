const Member = require("../models/Member");
const bcrypt = require("bcrypt");

const memberControllers = {
  //create a user
  createUser: async (req, res) => {
    try {
      const { membername, password } = req.body;

      if (!password || !membername) {
        return res
          .status(400)
          .json({ message: "Membername and password are required" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new Member({
        membername,
        password: hashed,
        isAdmin: false,
      });

      // Save the user to the database
      const member = await newUser.save();

      // Send the created user as a response
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = memberControllers;
