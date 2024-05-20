const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authControllers = {
  //create a user
  createUser: async (req, res) => {
    try {
      const { memberName, password, name, yob } = req.body;

      if (!password || !memberName) {
        return res
          .status(400)
          .json({ message: "Member Name and password are required" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new Member({
        memberName,
        password: hashed,
        name,
        yob,
      });

      // Save the user to the database
      const member = await newUser.save();

      // Send the created user as a response
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //Login member
  loginMember: async (req, res) => {
    try {
      const member = await Member.findOne({ memberName: req.body.memberName });
      if (!member) {
        return res.status(404).json({ message: "Wrong memberName!!!!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        member.password
      );
      if (!validPassword) {
        return res.status(404).json({ message: "Wrong password!!!!" });
      }
      if (member && validPassword) {
        res.status(200).json({ message: "Login successfull" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authControllers;
