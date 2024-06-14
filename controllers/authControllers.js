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
            name: member.name,
          },
          "12022002",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          id: member._id,
          accessToken,
          memberName: member.memberName,
          name: member.name,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Change password
  changePassword: async (req, res) => {
    try {
      const { memberName, oldPassword, newPassword } = req.body;
      const member = await Member.findOne({ memberName });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      const validPassword = await bcrypt.compare(oldPassword, member.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect old password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      member.password = hashedPassword;
      await member.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //logout member
  logoutMember: async (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json({ message: "Logout successful" });
  },
  // update member
  updateMember: async (req, res) => {
    try {
      const { memberName } = req.params;
      const { name, yob } = req.body;
      var yobDate = new Date(yob.split("-").reverse().join("-"));
      const member = await Member.findOne({ memberName });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      member.name = name;
      member.yob = yobDate;
      await member.save();
      res.status(200).json({ message: "Member updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //getByMemberName
  getByMemberName: async (req, res) => {
    try {
      const member = await Member.findOne({
        memberName: req.params.memberName,
      });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //getAllMembers
  getAllMembers: async (req, res) => {
    try {
      const members = await Member.find({ isAdmin: false });
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authControllers;
