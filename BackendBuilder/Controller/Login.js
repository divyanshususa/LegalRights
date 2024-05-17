const authService = require("../Services/Login");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { token, role } = await authService.login(email, password); // Modify to get token and role

    res.json({ token, role }); // Return token and role in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { login };
 