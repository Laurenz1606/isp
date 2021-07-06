const jwt = require("jsonwebtoken");
module.exports = function authenticateToken(req, res, next) {
  //get the token from the header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check if token exists
  if (token == null) return res.sendStatus(401);

  //verify user
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //user token is wrong
    if (err) return res.sendStatus(403);

    //set the user to the request.user
    req.user = user;
    next();
  });
};
