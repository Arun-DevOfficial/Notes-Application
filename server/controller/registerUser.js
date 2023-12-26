const bcrypt = require("bcrypt");
const db = require("../model/db");

const handleRegisterUser = (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    // Validate existing user or not
    const checkUserQuery = "SELECT username FROM Users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store User data to database
      const storeUserQuery =
        "INSERT INTO Users(username, password) VALUES (?, ?)";
      db.query(storeUserQuery, [username, hashedPassword], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server Error" });
        }

        // Registration successful
        res.status(200).json({ message: "Registration successful" });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleRegisterUser;
