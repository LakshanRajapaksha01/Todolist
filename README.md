<<<<<<< HEAD
# Todo List Application - Backend API

A RESTful API built with .NET 8 and MySQL for managing todo tasks.

## 🏗️ Architecture

This system follows a three-tier architecture:

- **Database**: MySQL 8.0
- **Backend API**: .NET 8 Web API with Entity Framework Core
- **Frontend**: (To be developed - SPA framework)

## 📋 Features

- Create new todo tasks with title and description
- View the 5 most recent incomplete tasks
- Mark tasks as completed
- Completed tasks are automatically hidden from the list
- RESTful API design
- Docker support for easy deployment
- Automatic database migrations

## 🛠️ Tech Stack

- **.NET 8**: Backend framework
- **Entity Framework Core 8**: ORM for database operations
- **MySQL 8.0**: Relational database
- **Pomelo.EntityFrameworkCore.MySql**: MySQL provider for EF Core
- **Swagger/OpenAPI**: API documentation
- **Docker & Docker Compose**: Containerization

## 📁 Project Structure

```
Todolist CoverageX/
├── Controllers/
│   ├── TasksController.cs         # REST API endpoints for tasks
│   └── WeatherForecastController.cs
├── Data/
│   └── ApplicationDbContext.cs    # Database context
├── DTOs/
│   ├── CreateTaskDto.cs          # DTO for creating tasks
│   └── TaskDto.cs                # DTO for task responses
├── Models/
│   └── TodoTask.cs               # Task entity model
├── Migrations/                    # EF Core migrations (auto-generated)
├── appsettings.json              # Configuration
├── Program.cs                    # Application entry point
└── Todolist CoverageX.csproj     # Project file
```

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- MySQL 8.0 (or use Docker)
- Docker & Docker Compose (optional, for containerized setup)

### Option 1: Run with Docker (Recommended)

1. **Navigate to the project directory:**

   ```powershell
   cd "c:\Users\LAKSHAN\Desktop\Todo list\Todolist CoverageX"
   ```

2. **Start all services with Docker Compose:**

   ```powershell
   docker-compose up -d
   ```

   This will start:

   - MySQL database on port 3306
   - Backend API on port 5000

3. **Access the API:**

   - API: http://localhost:5000
   - Swagger UI: http://localhost:5000/swagger

4. **Stop services:**
   ```powershell
   docker-compose down
   ```

### Option 2: Run Locally

1. **Install MySQL 8.0 and create database:**

   ```sql
   CREATE DATABASE todolist_db;
   ```

2. **Update connection string in `appsettings.json` if needed:**

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Port=3306;Database=todolist_db;User=root;Password=rootpassword;"
     }
   }
   ```

3. **Restore NuGet packages:**

   ```powershell
   cd "Todolist CoverageX"
   dotnet restore
   ```

4. **Create and apply database migrations:**

   ```powershell
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. **Run the application:**

   ```powershell
   dotnet run
   ```

6. **Access the API:**
   - HTTPS: https://localhost:7xxx
   - HTTP: http://localhost:5xxx
   - Swagger UI: https://localhost:7xxx/swagger

## 📡 API Endpoints

### Get Tasks

**GET** `/api/Tasks`

- Returns the 5 most recent incomplete tasks
- Response: `200 OK` with array of TaskDto

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

### Get Single Task

**GET** `/api/Tasks/{id}`

- Returns a specific task by ID
- Response: `200 OK` with TaskDto or `404 Not Found`

### Create Task

**POST** `/api/Tasks`

- Creates a new task
- Request body:

```json
{
  "title": "Buy books",
  "description": "Buy books for the next school year"
}
```

- Response: `201 Created` with TaskDto

### Complete Task

**PUT** `/api/Tasks/{id}/complete`

- Marks a task as completed
- Response: `200 OK` or `404 Not Found`

```json
{
  "message": "Task marked as completed",
  "taskId": 1
}
```

### Delete Task

**DELETE** `/api/Tasks/{id}`

- Deletes a task
- Response: `200 OK` or `404 Not Found`

```json
{
  "message": "Task deleted successfully",
  "taskId": 1
}
```

## 🗄️ Database Schema

**Table: `task`**

| Column       | Type          | Description                        |
| ------------ | ------------- | ---------------------------------- |
| id           | INT (PK)      | Auto-increment primary key         |
| title        | VARCHAR(200)  | Task title (required)              |
| description  | VARCHAR(1000) | Task description (optional)        |
| is_completed | BOOLEAN       | Completion status (default: false) |
| created_at   | DATETIME      | Creation timestamp                 |
| updated_at   | DATETIME      | Last update timestamp (nullable)   |

## 🔧 Configuration

### Database Connection

Update `appsettings.json` with your MySQL credentials:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=todolist_db;User=YOUR_USER;Password=YOUR_PASSWORD;"
  }
}
```

### CORS Configuration

The API is configured to allow requests from common frontend development servers:

- http://localhost:3000 (React default)
- http://localhost:5173 (Vite default)
- http://localhost:4200 (Angular default)

Update `Program.cs` to add more origins if needed.

## 🧪 Testing

### Using Swagger UI

1. Run the application
2. Navigate to https://localhost:7xxx/swagger
3. Test endpoints directly from the browser

### Using cURL

```powershell
# Create a task
curl -X POST http://localhost:5000/api/Tasks -H "Content-Type: application/json" -d '{\"title\":\"Buy books\",\"description\":\"Buy books for the next school year\"}'

# Get all tasks
curl http://localhost:5000/api/Tasks

# Complete a task
curl -X PUT http://localhost:5000/api/Tasks/1/complete
```

## 🐳 Docker Commands

```powershell
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## 📝 Development Notes

### Adding New Migrations

When you modify the database models:

```powershell
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Code Structure

- **Models**: Entity classes representing database tables
- **DTOs**: Data Transfer Objects for API requests/responses
- **Controllers**: API endpoint handlers
- **Data**: Database context and configuration

### Clean Code Principles

The project follows SOLID principles:

- **Single Responsibility**: Each class has one responsibility
- **Dependency Injection**: Used throughout for loose coupling
- **Repository Pattern**: Can be added for data access abstraction
- **DTOs**: Separate models from API contracts

## 🎯 Next Steps

1. **Frontend Development**: Build a SPA using React, Vue, or Angular
2. **Unit Tests**: Add xUnit tests for controllers and services
3. **Integration Tests**: Test API endpoints
4. **Authentication**: Add JWT authentication
5. **Validation**: Enhanced input validation
6. **Logging**: Implement structured logging
7. **Error Handling**: Global exception handler middleware

## 🤝 Submission

- Ensure Docker and Docker Compose are installed
- Run `docker-compose up -d` to start all services
- The API will be available at http://localhost:5000
- Database will be automatically created and migrated

## 📄 License

This is a take-home assessment project.

## 👤 Author

LAKSHAN

---

**Note**: This is the backend API implementation. The frontend SPA needs to be developed separately and can communicate with this API through the exposed endpoints.
=======
# CoverageX-Todolist
>>>>>>> b18e47309f10e380e5ce6f3eefc45ee29b18c2e9
