const express = require("express");
const authenticateToken = require("./VerifyToken");
const User = require("../Models/User");
const Route = express.Router();

Route.get("/getAll", authenticateToken, async (req, res) => {
  let { provision } = await User.findById(req.user._id);
  res.json({ provision, code: 0 });
});

module.exports = Route;
