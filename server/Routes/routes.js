const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../middleware/corsOptions");
const handleRegisterUser = require("../controller/registerUser");
const handleLogin = require("../controller/authUser");
const handleAddTask = require("../controller/addTask");
const handleViewTask = require("../controller/viewTask");
const handleDeleteTask = require("../controller/removeTask");
const handleUpdateTask = require("../controller/updateTask");

//body parser
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
//middleware
router.use(cors(corsOptions));

//server router
router.route("/register").post(handleRegisterUser);
router.route("/login").post(handleLogin);
router.route("/taskform").post(handleAddTask);
router.route("/viewtasks").get(handleViewTask);
router.delete("/delete/:id", handleDeleteTask);
router.put("/update/:id", handleUpdateTask);
router.get("/user", (req, res) => {
  res.json("Server is running on...");
});

module.exports = router;
