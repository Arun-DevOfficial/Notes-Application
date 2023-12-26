const db = require("../model/db");

const handleUpdateTask = (req, res) => {
  const id = req.params.id;
  const { taskTitle, deadlineDate, completionStatus } = req.body;
  console.log({
    title: taskTitle,
    date: deadlineDate,
    id: id,
  });
  // Validation
  if (!taskTitle || !deadlineDate || !completionStatus) {
    return res
      .status(400)
      .json({ error: "Task title and deadline date are required" });
  }

  try {
    // Update the task in the database
    const updateTaskQuery =
      "UPDATE Tasks SET title = ?, deadline = ?,status=? WHERE id = ?";
    db.query(
      updateTaskQuery,
      [taskTitle, deadlineDate, completionStatus, id],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server Error" });
        }

        // Task updated successfully
        res.status(200).json({ message: "Task updated successfully" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = handleUpdateTask;
