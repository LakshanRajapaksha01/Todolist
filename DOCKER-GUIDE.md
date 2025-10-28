# Docker Setup Guide - Full Stack Todo Application

## 📦 Complete Stack with Docker

Your application now has **3 services** running in Docker:

1. **MySQL Database** (Port 3306)
2. **Backend API (.NET)** (Port 5000)
3. **Frontend (React + Vite)** (Port 3000)

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  Port 3000
│  (React + Vite) │  Nginx + SPA
└────────┬────────┘
         │
         │ HTTP Requests
         ▼
┌─────────────────┐
│   Backend API   │  Port 5000
│   (.NET 8)      │  REST API
└────────┬────────┘
         │
         │ SQL Queries
         ▼
┌─────────────────┐
│   MySQL 8.0     │  Port 3306
│   Database      │  Persistent Storage
└─────────────────┘
```

## 🚀 Quick Start (All Services)

```powershell
# Navigate to project root
cd "c:\Users\LAKSHAN\Desktop\Todo list\Todolist CoverageX"

# Start all services at once
docker-compose up -d

# Wait about 30-60 seconds for all services to initialize
Start-Sleep -Seconds 60

# Open the application
start http://localhost:3000
```

**Access Points:**

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger
- **MySQL**: localhost:3306

## 📋 Docker Compose Services

### 🗄️ MySQL Service

```yaml
Service Name: mysql
Container: todolist-mysql
Port: 3306
Database: todolist_db
Root Password: rootpassword
User: todouser / todopassword
Volume: mysql_data (persistent)
```

### 🔧 Backend Service

```yaml
Service Name: backend
Container: todolist-backend
Port: 5000 → 80
Build: Root Dockerfile
Environment: Development
Depends on: MySQL (with health check)
```

### 🎨 Frontend Service

```yaml
Service Name: frontend
Container: todolist-frontend
Port: 3000 → 80
Build: frontend/Frontend/Dockerfile
Technology: React + TypeScript + Vite + Nginx
Depends on: Backend API
```

## 🔨 Individual Service Commands

### Build Individual Services

```powershell
# Build backend only
docker-compose build backend

# Build frontend only
docker-compose build frontend

# Build all services
docker-compose build
```

### Start Individual Services

```powershell
# Start MySQL only
docker-compose up -d mysql

# Start backend (requires MySQL)
docker-compose up -d backend

# Start frontend (requires backend)
docker-compose up -d frontend
```

### View Logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql
```

### Restart Services

```powershell
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart frontend
docker-compose restart backend
```

## 🛠️ Development Workflow

### Making Frontend Changes

```powershell
# Option 1: Rebuild and restart
docker-compose build frontend
docker-compose up -d frontend

# Option 2: Stop container, run locally with hot reload
docker-compose stop frontend
cd frontend\Frontend
npm run dev
# Access at http://localhost:5173
```

### Making Backend Changes

```powershell
# Rebuild and restart
docker-compose build backend
docker-compose up -d backend

# Or run locally
cd "Todolist CoverageX"
dotnet run
```

## 🧪 Testing the Full Stack

```powershell
# 1. Start all services
docker-compose up -d

# 2. Wait for initialization
Start-Sleep -Seconds 60

# 3. Test backend API
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# 4. Test frontend
start http://localhost:3000

# 5. Create a task via API
$task = @{ title = "Test Task"; description = "From PowerShell" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method POST -Body $task -ContentType "application/json"

# 6. Verify in frontend
start http://localhost:3000
```

## 📁 Docker Files Structure

```
Todolist CoverageX/
├── docker-compose.yml          # Orchestrates all services
├── Dockerfile                  # Backend container
├── .dockerignore              # Backend ignore file
│
└── frontend/
    └── Frontend/
        ├── Dockerfile          # Frontend container (multi-stage)
        ├── nginx.conf          # Nginx configuration for SPA
        ├── .dockerignore      # Frontend ignore file
        └── .env               # Frontend environment variables
```

## 🔍 Verify Services

### Check Running Containers

```powershell
docker ps

# Expected output:
# todolist-frontend  (port 3000)
# todolist-backend   (port 5000)
# todolist-mysql     (port 3306)
```

### Check Service Health

```powershell
# MySQL health
docker exec todolist-mysql mysqladmin ping -h localhost -u root -prootpassword

# Backend health
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# Frontend health
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

### Check Logs for Errors

```powershell
# Check backend startup
docker logs todolist-backend

# Check frontend build
docker logs todolist-frontend

# Check MySQL initialization
docker logs todolist-mysql
```

## 🐛 Troubleshooting

### Frontend Not Loading

```powershell
# Check if container is running
docker ps | findstr frontend

# Check logs
docker logs todolist-frontend

# Verify build
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### Backend API Errors

```powershell
# Check database connection
docker logs todolist-backend | findstr "error"

# Ensure MySQL is healthy
docker ps | findstr mysql

# Restart backend
docker-compose restart backend
```

### Port Conflicts

```powershell
# Check what's using ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :3306

# Stop existing containers
docker-compose down

# Start again
docker-compose up -d
```

### Clean Start (Nuclear Option)

```powershell
# Stop all containers
docker-compose down -v

# Remove all images
docker-compose rm -f

# Rebuild everything
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## 🔧 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

### Backend (docker-compose.yml)

```yaml
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:80
ConnectionStrings__DefaultConnection=Server=mysql;Port=3306;...
```

## 📊 Resource Usage

```powershell
# Check container resource usage
docker stats

# Container sizes
docker-compose images
```

## 🛑 Stopping Services

```powershell
# Stop all (keeps data)
docker-compose stop

# Stop and remove containers (keeps data)
docker-compose down

# Stop and remove everything including volumes (deletes database)
docker-compose down -v

# Stop specific service
docker-compose stop frontend
```

## 🚀 Production Deployment

### Build for Production

```powershell
# Set production environment
$env:ASPNETCORE_ENVIRONMENT="Production"

# Build optimized images
docker-compose build --no-cache

# Run in production mode
docker-compose up -d
```

### Production Checklist

- [ ] Update connection strings with production credentials
- [ ] Change default passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up proper logging
- [ ] Configure backup for MySQL volume
- [ ] Update CORS origins in backend
- [ ] Build frontend with production API URL

## 📈 Monitoring

```powershell
# Watch logs in real-time
docker-compose logs -f --tail=100

# Check service status
docker-compose ps

# Inspect specific service
docker inspect todolist-frontend
docker inspect todolist-backend
docker inspect todolist-mysql
```

## 💾 Database Backup

```powershell
# Backup database
docker exec todolist-mysql mysqldump -u root -prootpassword todolist_db > backup.sql

# Restore database
Get-Content backup.sql | docker exec -i todolist-mysql mysql -u root -prootpassword todolist_db
```

## 🎯 Complete Workflow Example

```powershell
# 1. Initial setup
cd "c:\Users\LAKSHAN\Desktop\Todo list\Todolist CoverageX"

# 2. Build all services
docker-compose build

# 3. Start everything
docker-compose up -d

# 4. Wait for services to be ready
Write-Host "Waiting for services to start..."
Start-Sleep -Seconds 60

# 5. Test backend
Write-Host "Testing Backend API..."
Invoke-RestMethod -Uri "http://localhost:5000/api/Tasks" -Method GET

# 6. Open frontend
Write-Host "Opening Frontend..."
start http://localhost:3000

# 7. View logs
docker-compose logs -f
```

---

## ✅ Success Indicators

Your Docker setup is working correctly when:

1. ✅ `docker ps` shows 3 running containers
2. ✅ http://localhost:3000 loads the frontend
3. ✅ http://localhost:5000/swagger shows API docs
4. ✅ Backend can connect to MySQL
5. ✅ Frontend can call backend API
6. ✅ Tasks created in frontend appear in database

## 🎉 You're All Set!

All three services are now containerized and can be deployed anywhere that supports Docker!
