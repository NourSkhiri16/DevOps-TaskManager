
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

// Home page
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

// Task routes
app.use("/tasks", taskRoutes);

module.exports = app;
