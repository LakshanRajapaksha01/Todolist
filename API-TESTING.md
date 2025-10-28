# API Testing Guide

## Quick Test with PowerShell

### 1. Start the application with Docker

```powershell
cd "c:\Users\LAKSHAN\Desktop\Todo list\Todolist CoverageX"
docker-compose up -d
```

Wait for about 30 seconds for services to start completely.

### 2. Test Endpoints

#### Create a Task

```powershell
$body = @{
    title = "Buy books"
    description = "Buy books for the next school year"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $body -ContentType "application/json"
```

#### Get All Tasks

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET
```

#### Get Single Task

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks/1" -Method GET
```

#### Complete a Task

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks/1/complete" -Method PUT
```

#### Delete a Task

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks/1" -Method DELETE
```

### 3. Create Multiple Tasks

```powershell
# Task 1
$task1 = @{ title = "Buy books"; description = "Buy books for the next school year" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task1 -ContentType "application/json"

# Task 2
$task2 = @{ title = "Clean home"; description = "Need to clean the bed room" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task2 -ContentType "application/json"

# Task 3
$task3 = @{ title = "Telephone assignment"; description = "Finish the mid term assignment" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task3 -ContentType "application/json"

# Task 4
$task4 = @{ title = "Play Cricket"; description = "Play the soft ball cricket match on next Sunday" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task4 -ContentType "application/json"

# Task 5
$task5 = @{ title = "Help Saman"; description = "Saman need help with his software project" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task5 -ContentType "application/json"

# Get all tasks
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET
```

### 4. Test Task Completion

```powershell
# Complete task 1
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks/1/complete" -Method PUT

# Verify it's removed from the list (should only show 4 tasks now)
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET
```

## Using Swagger UI

1. Navigate to: http://localhost:5000/swagger
2. Try out each endpoint interactively
3. View request/response schemas

## Using cURL (if installed)

```bash
# Create a task
curl -X POST http://localhost:5000/api/Tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy books","description":"Buy books for the next school year"}'

# Get all tasks
curl http://localhost:5000/api/Tasks

# Complete a task
curl -X PUT http://localhost:5000/api/Tasks/1/complete

# Delete a task
curl -X DELETE http://localhost:5000/api/Tasks/1
```

## Verify Database Directly

```powershell
# Connect to MySQL container
docker exec -it todolist-mysql mysql -uroot -prootpassword

# In MySQL shell:
USE todolist_db;
SELECT * FROM task;
SELECT * FROM task WHERE is_completed = false ORDER BY created_at DESC LIMIT 5;
```

## Expected Response Formats

### GET /api/Tasks

```json
[
  {
    "id": 1,
    "title": "Buy books",
    "description": "Buy books for the next school year",
    "isCompleted": false,
    "createdAt": "2025-10-28T10:30:00Z",
    "updatedAt": null
  }
]
```

### POST /api/Tasks (201 Created)

```json
{
  "id": 1,
  "title": "Buy books",
  "description": "Buy books for the next school year",
  "isCompleted": false,
  "createdAt": "2025-10-28T10:30:00Z",
  "updatedAt": null
}
```

### PUT /api/Tasks/{id}/complete (200 OK)

```json
{
  "message": "Task marked as completed",
  "taskId": 1
}
```

## Troubleshooting

### Check if services are running

```powershell
docker ps
```

### View logs

```powershell
# Backend logs
docker logs todolist-backend

# MySQL logs
docker logs todolist-mysql
```

### Restart services

```powershell
docker-compose down
docker-compose up -d
```

### Check API health

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET
```
