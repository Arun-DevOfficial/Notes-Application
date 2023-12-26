const db = require("../model/db");

// Handle deleting a task
const handleDeleteTask = (req, res) => {
  const taskId = req.params.id;

  // Validation
  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  try {
    // Delete the task from the database
    const deleteTaskQuery = "DELETE FROM Tasks WHERE id = ?";
    db.query(deleteTaskQuery, [taskId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
      }

      // Check if the task was found and deleted
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      // Task deleted successfully
      res.status(200).json({ message: "Task deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleDeleteTask;
