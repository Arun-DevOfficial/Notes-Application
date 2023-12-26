import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth";
import Register from "./components/Register";
import TaskForm from "./components/Taskform";
import Dashboard from "./Pages/Dashboard";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Auth} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/taskform" Component={TaskForm} />
        <Route path="/update/:id" Component={UpdateForm} />
      </Routes>
    </>
  );
}

export default App;
