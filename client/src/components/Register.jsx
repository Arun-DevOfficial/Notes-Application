import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
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

    // validation
    let hasErrors = false;
    const newErrors = {};

    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
      hasErrors = true;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      // Submit the form (you can add your registration logic here)
      console.log("Form submitted:", formData);

      // Axios API
      Axios.post("https://note-task-app.onrender.com/register", {
        username: formData.username,
        password: formData.password,
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("User successfully registered");
            localStorage.setItem("username", formData.username);
          }
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        })
        .catch((error) => {
          toast.error("Error registering user");
        });
    }
  };

  return (
    <>
      <section className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Email"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex space-x-4 mx-auto">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md hover:border-gray-300 hover:shadow hover:border hover:border-transparent"
              >
                <Link to="/">Cancel</Link>
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
