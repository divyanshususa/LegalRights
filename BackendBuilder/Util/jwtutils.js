var jwt = require("jsonwebtoken");
const secretKey = require("../JwtConfig");

async function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  
  // Sign the payload with the secret key to create a valid JWT token
const token = jwt.sign(
  {
    data: "foobar",
  },
  "sercete",
  { expiresIn: "1h" }
);

  // Log the generated token if needed
 

  return token;
}

module.exports = {
  generateToken,
};
