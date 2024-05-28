const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authControllers = {
  //create a user
  createUser: async (req, res) => {
    try {
      const { memberName, password, name, yob } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new Member({
        memberName,
        password: hashed,
        name,
        yob,
      });

      await newUser.save();

      // Send the created user as a response
      res.status(200).json(newUser);
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
        const accessToken = jwt.sign(
          {
            id: member.id,
            admin: member.isAdmin,
          },
          "12022002",
          { expiresIn: "1h" }
        );
        console.log(accessToken);
        res.redirect("/HomePage");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authControllers;
