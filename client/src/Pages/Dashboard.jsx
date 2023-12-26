import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [viewTask, setViewTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://note-task-app.onrender.com/viewtasks");
        console.log("Fetched tasks:", response.data);
        setViewTask(response.data);

        const result = handleIsCurrentDate();

        if (result) {
          console.log("Date's same");
          handleEmailRemainder();
        } else {
          console.log("Email haven't sent...");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleIsCurrentDate = () => {
    const currentDate = new Date();
    console.log("Current Date:", currentDate);
    console.log(viewTask);

    const isCurrentDate = viewTask.some(async (item) => {
      const providedDate = await item.deadline;

      console.log("Provided Date:", providedDate);

      const yearMatch =
        providedDate.getFullYear() === currentDate.getFullYear();
      const monthMatch = providedDate.getMonth() === currentDate.getMonth();
      const dayMatch = providedDate.getDate() === currentDate.getDate();
      console.log(dayMatch);
      console.log("Year Match:", yearMatch);
      console.log("Month Match:", monthMatch);
      console.log("Day Match:", dayMatch);

      return yearMatch && monthMatch && dayMatch;
    });

    console.log("Is Current Date:", isCurrentDate);
    return isCurrentDate;
  };

  const handleEmailRemainder = () => {
    const serviceID = "service_aweiy2o";
    const templateID = "template_lpjx96a";
    const publicKey = "vjHN8OtnwErTzM1Lf";

    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername);

    const recipient = storedUsername;
    const templateParams = {
      from_name: "Guvi Team",
      to_name: "Dear User",
      reply_to: "guvi.in",
      to_email: recipient,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log(result.text);
        console.log(result);
        console.log("Email've sent successfully...");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const handleDelete = async (taskId) => {
    console.log(taskId);
    try {
      const response = await axios.delete(
        `http://localhost:5050/delete/${taskId}`
      );

      if (response.status === 200) {
        console.log("Task deleted successfully:", response.data);
        const updatedTasks = viewTask.filter((task) => task.id !== taskId);
        setViewTask(updatedTasks);
      } else {
        console.error("Failed to delete task:", response.data.error);
      }
    } catch (error) {
      console.error("Server error:", error.message);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("username");
    const verify = window.confirm("Are you going to logout?");
    if (verify) return navigate("/");
  };

  return (
    <>
      <section className="min-h-screen bg-white">
        <div className="lg:w-[80%] w-full mx-auto">
          <div className="py-12 flex justify-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-slate-800">
              <span className="text-green-500">Note</span> Application
            </h1>
          </div>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-medium text-slate-500">Task List</h1>
            <div className="flex space-x-6 items-center">
              <Link
                to="/taskform"
                className="flex items-center space-x-2 bg-green-500 px-5 py-2 rounded-lg text-white"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M13.5 1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="font-semibold text-md lg:text-lg">Add task</p>
              </Link>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1.4em"
                width="1.4em"
                className="hover:shadow hover:text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleLogOut}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {viewTask.map((task) => (
              <div
                key={task.id}
                className="bg-[#f6f6f6] p-4 rounded-md shadow-md transition-transform transform hover:shadow-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <p className="text-md text-gray-500 p-2">{task.deadline}</p>
                  <p>{task.status}</p>
                </div>
                <div className="flex space-x-5 items-center mr-4">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    height="1.4em"
                    width="1.4em"
                    className="text-green-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate(`/update/${task.id}`)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  <svg
                    onClick={() => handleDelete(task.id)}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1.3em"
                    width="1.3em"
                    className="text-red-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
