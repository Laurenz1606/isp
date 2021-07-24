const express = require("express");
const authenticateToken = require("./VerifyToken");
const Roles = require("../Models/Role");
const Route = express.Router();

Route.get("/getAll", authenticateToken, async (req, res) => {
  res.json({code: 0, data: await Roles.find() })
})

module.exports = Route;
