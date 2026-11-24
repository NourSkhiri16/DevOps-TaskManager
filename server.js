

const app = require("./src/app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log("MY DEVOPS TASK MANAGER SERVER STARTED");
    console.log(`Server running on http://localhost:${PORT}`);
});
