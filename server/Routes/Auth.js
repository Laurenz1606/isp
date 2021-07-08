//dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//mongodb models
const User = require("../Models/User");

//express config
const Route = express.Router();

//refresh tokens array(replaces a database)
let refreshTokens = [];

//refresh an accesstoken with a refreshtoken
Route.post("/refresh", (req, res) => {
  //get the refreshtoken
  const refreshToken = req.body.token;

  //check if token exists
  if (refreshToken == null) return res.status(401).json({ code: 7 });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ code: 8 });

  //verify the token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ code: 9 });

    //generate and send the new access token
    delete user.iat;
    const accessToken = generateAccessToken(user);
    res.json({ code: 0, accessToken: accessToken });
  });
});

Route.post("/check", (req, res) => {
  //get the refreshtoken
  const accesToken = req.body.accessToken;
  const refreshToken = req.body.refreshToken;

  //check if token exists
  if (refreshToken == null) return res.status(401).json({ code: 7 });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ code: 8 });

  //verify the token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) return res.status(403).json({ code: 9 });
    else {
      jwt.verify(accesToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.status(403).json({ code: 10 });
        else {
          res.status(200).json({ code: 0 });
        }
      });
    }
  });
});

//delete a refresh token
Route.delete("/logout", (req, res) => {
  //delete the token and send the response(204 status)
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

//login post
Route.post("/login", async (req, res) => {
  //get requested username and password
  const username = req.body.username;
  const password = req.body.password;

  //find the user in our database
  let user = await User.find({ name: username });

  try {
    if (user.length === 1) {
      if (user[0].active) {
        if (await bcrypt.compare(password, user[0].hashedPassword)) {
          user = user[0];
          user = {
            name: user.name,
            roles: user.roles,
            _id: user._id,
            admin: user.admin,
          };

          //sign the json web token
          const accessToken = generateAccessToken(user);

          //sign an refresh token to refresh an expired jwt token and add it do our "database" here our array
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
          refreshTokens.push(refreshToken);

          //send the tokens to the user
          res.status(200).json({
            code: 0,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res.status(403).json({ code: 1 });
        }
      } else {
        res.status(403).json({ code: 10 });
      }
    } else {
      res.status(404).json({ code: 2 });
    }
  } catch (err) {
    res.status(500).json({ code: 3 });
  }
});

Route.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let user = await User.find({ name: req.body.username });
  try {
    if (user.length === 0) {
      user = await User.find({ email: req.body.email });
      if (user.length === 0) {
        user = await new User({
          name: req.body.username,
          email: req.body.email,
          hashedPassword: hashedPassword,
          admin: req.body.admin,
        });
        await user.save();
        res.status(201).json({ code: 6 });
      } else {
        res.status(403).json({ code: 5 });
      }
    } else {
      res.status(403).json({ code: 4 });
    }
  } catch (err) {
    res.status(500).json({ code: 3 });
  }
});

//generate a access token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRESIN + "s",
  });
}

module.exports = Route;
