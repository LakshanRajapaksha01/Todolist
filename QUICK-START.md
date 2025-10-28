# Quick Start Guide - Todo List Backend

## ✅ What Has Been Completed

The backend API with MySQL database is **fully implemented** and ready to use. Here's what's been created:

### Backend Components ✓

- ✅ RESTful API with .NET 8
- ✅ MySQL database integration with Entity Framework Core
- ✅ Task model with all required fields
- ✅ Complete CRUD operations for tasks
- ✅ Automatic filtering (shows only 5 most recent incomplete tasks)
- ✅ Mark task as completed endpoint
- ✅ Database migrations
- ✅ Docker support
- ✅ CORS configuration for frontend
- ✅ Swagger/OpenAPI documentation
- ✅ Error handling and logging
- ✅ Input validation with DTOs

### API Endpoints ✓

- `GET /api/Tasks` - Get 5 most recent incomplete tasks
- `GET /api/Tasks/{id}` - Get specific task
- `POST /api/Tasks` - Create new task
- `PUT /api/Tasks/{id}/complete` - Mark task as completed
- `DELETE /api/Tasks/{id}` - Delete task

## 🚀 How to Run

### Option 1: Docker Compose (Recommended - One Command)

```powershell
# Navigate to project directory
cd "c:\Users\LAKSHAN\Desktop\Todo list\Todolist CoverageX"

# Start everything
docker-compose up -d

# Wait 30 seconds for services to initialize

# Test the API
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# View in browser
start http://localhost:5000/swagger
```

**Access Points:**

- API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger
- MySQL: localhost:3306 (user: root, password: rootpassword)

**Stop services:**

```powershell
docker-compose down
```

### Option 2: Run Locally (Manual Setup)

#### Step 1: Install MySQL

1. Install MySQL 8.0 from https://dev.mysql.com/downloads/mysql/
2. Start MySQL service
3. Run the database setup script:

```powershell
mysql -u root -p < database-setup.sql
```

#### Step 2: Update Connection String (if needed)

Edit `Todolist CoverageX/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Port=3306;Database=todolist_db;User=YOUR_USER;Password=YOUR_PASSWORD;"
}
```

#### Step 3: Run the Application

```powershell
cd "Todolist CoverageX"
dotnet run
```

Access at: https://localhost:7xxx or http://localhost:5xxx

## 🧪 Test the API

### Quick Test Script

```powershell
# Create 5 sample tasks
$tasks = @(
    @{ title = "Buy books"; description = "Buy books for the next school year" },
    @{ title = "Clean home"; description = "Need to clean the bed room" },
    @{ title = "Telephone assignment"; description = "Finish the mid term assignment" },
    @{ title = "Play Cricket"; description = "Play the soft ball cricket match on next Sunday" },
    @{ title = "Help Saman"; description = "Saman need help with his software project" }
)

foreach ($task in $tasks) {
    $body = $task | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $body -ContentType "application/json"
}

# Get all tasks
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# Complete first task
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks/1/complete" -Method PUT

# Verify it's removed from list
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET
```

See `API-TESTING.md` for more detailed testing examples.

## 📁 Project Structure

```
Todolist CoverageX/
├── Todolist CoverageX/              # Main API project
│   ├── Controllers/
│   │   └── TasksController.cs       # API endpoints
│   ├── Data/
│   │   ├── ApplicationDbContext.cs  # Database context
│   │   └── ApplicationDbContextFactory.cs
│   ├── DTOs/
│   │   ├── CreateTaskDto.cs        # Request DTO
│   │   └── TaskDto.cs              # Response DTO
│   ├── Models/
│   │   └── TodoTask.cs             # Task entity
│   ├── Migrations/                  # EF Core migrations
│   ├── Program.cs                  # App entry point
│   └── appsettings.json            # Configuration
├── docker-compose.yml              # Docker setup
├── Dockerfile                      # Backend container
├── database-setup.sql              # Manual DB setup
├── API-TESTING.md                  # Testing guide
└── README.md                       # Full documentation
```

## 🗄️ Database Schema

**Table: `task`**

```sql
CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000) NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NULL,
    INDEX idx_created_at (created_at)
);
```

## 📊 Example API Responses

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

### POST /api/Tasks

**Request:**

```json
{
  "title": "Buy books",
  "description": "Buy books for the next school year"
}
```

**Response (201 Created):**

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

## 🔍 Verify Everything Works

### 1. Check Services (Docker)

```powershell
docker ps
# Should show: todolist-backend and todolist-mysql
```

### 2. Check Database

```powershell
docker exec -it todolist-mysql mysql -uroot -prootpassword todolist_db -e "SHOW TABLES;"
```

### 3. Check API

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# View in browser
start http://localhost:5000/swagger
```

### 4. Check Logs

```powershell
# Backend logs
docker logs todolist-backend

# MySQL logs
docker logs todolist-mysql
```

## 🎯 Next Steps

1. **Test the API** - Use Swagger UI or PowerShell scripts
2. **Develop Frontend** - Create SPA (React/Vue/Angular)
3. **Add Unit Tests** - Test controllers and business logic
4. **Deploy** - Push to cloud or keep local

## 📦 Submission Checklist

- ✅ Backend API implemented (.NET 8)
- ✅ MySQL database configured
- ✅ Docker setup (docker-compose.yml)
- ✅ Database migrations
- ✅ RESTful API design
- ✅ Error handling
- ✅ Input validation
- ✅ Swagger documentation
- ✅ CORS configuration
- ✅ README with instructions
- ✅ All requirements from assessment met

## 🛟 Troubleshooting

### Docker containers won't start

```powershell
# Check if ports are available
netstat -ano | findstr :3306
netstat -ano | findstr :5000

# Stop and remove all containers
docker-compose down -v

# Rebuild and start
docker-compose build --no-cache
docker-compose up -d
```

### Database connection errors

1. Ensure MySQL is running: `docker ps`
2. Wait 30 seconds after `docker-compose up`
3. Check logs: `docker logs todolist-mysql`

### API not responding

1. Check if container is running: `docker ps`
2. Check logs: `docker logs todolist-backend`
3. Verify URL: http://localhost:5000/swagger

## 📞 Support Files

- `README.md` - Complete documentation
- `API-TESTING.md` - Detailed API testing guide
- `database-setup.sql` - Manual database setup
- `docker-compose.yml` - Container orchestration
- `Dockerfile` - Backend container configuration

---

## ⚡ Quick Commands Reference

```powershell
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Test API
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# Open Swagger
start http://localhost:5000/swagger
```

---

**Status: ✅ READY FOR TESTING AND SUBMISSION**

The backend is fully functional and meets all requirements from the assessment!
