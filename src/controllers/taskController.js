
let tasks = [
    { id: 1, title: "Learn DevOps", completed: false },
    { id: 2, title: "Build Docker Image", completed: false }
];

// GET all tasks
const getTasks = (req, res) => {
    res.json(tasks);
};

// POST a new task
const addTask = (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const task = {
        id: Date.now(),
        title: title.trim(),
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
};

// PUT update a task
const updateTask = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "Invalid task title" });
        }
        task.title = title.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }
        task.completed = completed;
    }

    res.json({ message: "Task updated successfully", task });
};

// DELETE a task
const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.json({
        message: "Task deleted successfully",
        task: deletedTask
    });
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};
