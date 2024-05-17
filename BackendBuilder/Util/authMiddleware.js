const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }

  jwt.verify(token, "sercete", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
