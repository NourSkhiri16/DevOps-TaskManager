
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// principale page
app.get("/", (req, res) => {
    res.send("Welcome to DevOps Task Manager!");
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Application is running"
    });
});

// show tasks
let tasks = [
    { id: 1, title: "Learn DevOps", completed: false },
    { id: 2, title: "Build Docker Image", completed: false }
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add New Task
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

// open server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
