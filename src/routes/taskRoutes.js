
const express = require("express");
const router = express.Router();

const {
    getTasks,
    addTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// GET all tasks
router.get("/", getTasks);

// POST a new task
router.post("/", addTask);

// PUT update a task
router.put("/:id", updateTask);

// DELETE a task
router.delete("/:id", deleteTask);

module.exports = router;
