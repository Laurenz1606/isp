const express = require("express");
const authenticateToken = require("./VerifyToken");
const User = require("../Models/User");
const Route = express.Router();

Route.get("/getAll/:id", authenticateToken, (req, res) => {});
