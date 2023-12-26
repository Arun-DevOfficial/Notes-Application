import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const UpdateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    completionStatus: "",
  });

  const { id } = useParams(); // task id

  const [errors, setErrors] = useState({
    title: "",
    deadline: "",
    completionStatus: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error when the user starts typing again
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let hasErrors = false;
    const newErrors = {};

    if (formData.title.trim() === "") {
      newErrors.title = "Title is required";
      hasErrors = true;
    }

    if (formData.deadline.trim() === "") {
      newErrors.deadline = "Deadline is required";
      hasErrors = true;
    }

    if (formData.completionStatus === "") {
      newErrors.completionStatus = "Please select completion status";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      // Submit the form (task update logic here)
      Axios.put(`http://localhost:5050/update/${id}`, {
        taskTitle: formData.title,
        deadlineDate: formData.deadline,
        completionStatus: formData.completionStatus,
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Task successfully updated");
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error("Error updating task");
        });
    }
  };

  return (
    <>
      <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Update Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-600"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.deadline ? "border-red-500" : ""
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
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
                value={formData.completionStatus}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.completionStatus ? "border-red-500" : ""
                }`}
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
            <div className="flex space-x-4 mx-auto">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow hover:bg-blue-600"
              >
                Update Task
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
      </section>
    </>
  );
};

export default UpdateTask;
