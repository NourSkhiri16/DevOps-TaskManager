
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

let server;
let baseURL;
let createdTaskId;

before(async () => {
    server = app.listen(0);

    await new Promise((resolve) => {
        server.once("listening", resolve);
    });

    const port = server.address().port;
    baseURL = `http://localhost:${port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});

// Test 1: Health check
test("GET /health returns OK", async () => {
    const response = await fetch(`${baseURL}/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "OK");
});

// Test 2: Get all tasks
test("GET /tasks returns an array", async () => {
    const response = await fetch(`${baseURL}/tasks`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(data));
});

// Test 3: Create a task
test("POST /tasks creates a task", async () => {
    const response = await fetch(`${baseURL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Test API Task" })
    });

    const data = await response.json();

    assert.equal(response.status, 201);
    assert.equal(data.title, "Test API Task");
    assert.equal(data.completed, false);
    assert.ok(data.id);

    createdTaskId = data.id;
});

// Test 4: Reject empty task title
test("POST /tasks rejects an empty title", async () => {
    const response = await fetch(`${baseURL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "   " })
    });

    assert.equal(response.status, 400);
});

// Test 5: Update a task
test("PUT /tasks/:id updates a task", async () => {
    const response = await fetch(
        `${baseURL}/tasks/${createdTaskId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "Updated API Task",
                completed: true
            })
        }
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.task.title, "Updated API Task");
    assert.equal(data.task.completed, true);
});

// Test 6: Delete a task
test("DELETE /tasks/:id deletes a task", async () => {
    const response = await fetch(
        `${baseURL}/tasks/${createdTaskId}`,
        { method: "DELETE" }
    );

    assert.equal(response.status, 200);
});

// Test 7: Updating a deleted task returns 404
test("PUT deleted task returns 404", async () => {
    const response = await fetch(
        `${baseURL}/tasks/${createdTaskId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true })
        }
    );

    assert.equal(response.status, 404);
});
