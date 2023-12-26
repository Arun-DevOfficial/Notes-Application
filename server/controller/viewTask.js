const db = require("../model/db");

const handleViewTask = (req, res) => {
  try {
    // Retrieve tasks from the database
    const viewTaskQuery = "SELECT * FROM Tasks";
    db.query(viewTaskQuery, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
      }

      // Send the retrieved tasks to the client
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleViewTask;
