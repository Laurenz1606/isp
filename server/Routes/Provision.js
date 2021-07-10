const express = require("express");
const schedule = require("node-schedule");
const authenticateToken = require("./VerifyToken");
const User = require("../Models/User");
const Route = express.Router();

Route.get("/getAll", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ provision: user.provision, code: 0 });
});

const map = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

Route.get("/newMonth", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.provision = newMonth(
    user.provision,
    parseFloat(Math.floor(Math.random() * 100).toFixed(2)),
    parseFloat(
      map(
        Math.floor(Math.random() * 100),
        0,
        100,
        0,
        getMonthValue(user.provision.currentMonth)
      ).toFixed(2)
    )
  );
  await user.save();
  res.json({});
});

function newMonth(provision, newIn, newOut) {
  return {
    currentMonth: {
      prevMonth: getMonthValue(provision.currentMonth),
      currentIncome: newIn,
      currentOut: newOut,
    },
    prevMonths: [provision.currentMonth, ...provision.prevMonths],
  };
}

function getMonthValue(month) {
  return parseFloat(
    (month.prevMonth + month.currentIncome - month.currentOut).toFixed(2)
  );
}

module.exports = Route;
