# DevOps Task Manager

A simple Task Manager REST API built with Node.js and Express.

## Project Structure

```text
DevOps-TaskManager/
├── src/
│   ├── app.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── controllers/
│       └── taskController.js
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Requirements

- Node.js
- npm
- Docker Desktop (for Docker execution)

## Run Locally

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node server.js
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | Check application health |

## Docker

Build the Docker image:

```bash
docker build -t devops-taskmanager .
```

Run the container:

```bash
docker run -d -p 3001:3000 --name taskmanager-container devops-taskmanager
```

Access the API:

```text
http://localhost:3001
```

## Testing

The backend API was tested using Postman, including:

- Health check
- Get all tasks
- Create a task
- Update a task
- Delete a task

## Note

Tasks are currently stored in memory. Data is not persistent after the application restarts.