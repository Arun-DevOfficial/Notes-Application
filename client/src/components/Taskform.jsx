import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [completionStatus, setCompletionStatus] = useState("Not Completed");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};

    if (!taskTitle.trim()) {
      newErrors.taskTitle = "Task Title is required";
    }

    if (!deadlineDate.trim()) {
      newErrors.deadlineDate = "Deadline Date is required";
    }

    if (!completionStatus.trim()) {
      newErrors.completionStatus = "Please select completion status";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/taskform", {
        taskTitle,
        deadlineDate,
        completionStatus,
      });

      if (response.status === 200) {
        // Task added successfully
        console.log("Task added successfully:", response.data);
        toast.success("Task added successfully");
        // Navigate to /dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Handle other response statuses as needed
        console.error("Failed to add task:", response.data.error);
      }
    } catch (error) {
      console.error("Server error:", error.message);
      // Handle other errors as needed
    }
  };

  return (
    <>
      <div className="container mx-auto mt-40">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskTitle"
                className="block text-sm font-medium text-gray-600"
              >
                Task Title
              </label>
              <input
                type="text"
                id="taskTitle"
                name="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.taskTitle ? "border-red-500" : ""
                }`}
              />
              {errors.taskTitle && (
                <p className="text-red-500 text-xs mt-1">{errors.taskTitle}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="deadlineDate"
                className="block text-sm font-medium text-gray-600"
              >
                Deadline Date
              </label>
              <input
                type="date"
                id="deadlineDate"
                name="deadlineDate"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.deadlineDate ? "border-red-500" : ""
                }`}
              />
              {errors.deadlineDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.deadlineDate}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="completionStatus"
                className="block text-sm font-medium text-gray-600"
              >
                Completion Status
              </label>
              <select
                id="completionStatus"
                name="completionStatus"
                value={completionStatus}
                onChange={(e) => setCompletionStatus(e.target.value)}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.completionStatus ? "border-red-500" : ""
                }`}
                required
              >
                <option value="Not Completed">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.completionStatus && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.completionStatus}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow hover:bg-blue-600"
              >
                Add Task
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md hover:border-gray-300 hover:shadow hover:border hover:border-transparent"
              >
                <Link to="/dashboard">Cancel</Link>
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TaskForm;
