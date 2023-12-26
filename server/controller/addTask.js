const db = require("../model/db");

const handleAddTask = (req, res) => {
  const { taskTitle, deadlineDate, completionStatus } = req.body;

  // Validation
  if (!taskTitle || !deadlineDate || !completionStatus) {
    return res
      .status(400)
      .json({ error: "Task title and deadline date are required" });
  }

  try {
    // Add the task to the database
    const addTaskQuery = "INSERT INTO Tasks(title, deadline,status) VALUES (?, ?,?)";
    db.query(addTaskQuery, [taskTitle, deadlineDate,completionStatus], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
      }

      // Task added successfully
      res.status(200).json({ message: "Task added successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleAddTask;
