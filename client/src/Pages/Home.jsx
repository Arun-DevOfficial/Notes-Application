import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-screen">
        <div className="container text-center flex flex-col space-y-6 justify-center w-[80%] mx-auto items-center max-w-[720px] lg:max-w-[620px] h-screen">
          <h1 className="text-3xl lg:text-6xl font-bold">
            Welcome to <span className="text-green-500">Guvi</span>
          </h1>
          <p className="text-gray-500 max-w-[400px]">
            "Step into our team, where every member is a valued part of the
            family. Join us!"
          </p>
          <div className="flex space-x-4">
            <button className="bg-green-400 px-5 py-2 rounded-lg w-[100px] text-white font-medium shadow hover:shadow-md hover:bg-green-600">
              <Link to="/register">Sign Up</Link>
            </button>
            <button className=" px-5 py-2 rounded-lg w-[100px] font-medium shadow hover:shadow-md">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
