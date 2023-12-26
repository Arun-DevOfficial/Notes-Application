const bcrypt = require("bcrypt");
const db = require("../model/db");

const handleLogin = (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Fetch user from the database
  const getUserQuery = "SELECT * FROM Users WHERE username = ?";

  db.query(getUserQuery, [username], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ error: "Server Error. Please try again later." });
    }

    // Check if the user exists
    if (results.length === 0) {
      // Provide a generic error message to avoid revealing too much information
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const storedHashedPassword = results[0].password;

    try {
      // Compare the provided password with the hashed password from the database
      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      if (!isPasswordValid) {
        // Provide a generic error message to avoid revealing too much information
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Login successful
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Password comparison error:", error);
      return res
        .status(500)
        .json({ error: "Server Error. Please try again later." });
    }
  });
};

module.exports = handleLogin;
