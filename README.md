# Taskly WebApp

## Setup Instructions

Follow these steps to set up and run the project:

## Prerequisites

- Ensure **Docker Desktop** is installed and running on your system.

## Installation Steps

1. **Open Docker Desktop** on your system.

2. **Create a new folder** on your local machine and open Command Prompt (CMD) inside it.

3. **Clone the repository** by running the following command:

   ```bash
   git clone <repository-link>
   ```

4. **Navigate to the project folder**:

   ```bash
   cd Todolist
   ```

5. **Run the application using Docker Compose**:

   ```bash
   docker-compose up --build
   ```

6. **Access the application** by opening the following URL in your browser:

   ```
   http://localhost:5000
   ```

## Additional Notes

- If you encounter any issues, ensure that **Docker is running** and you have **network access**.
- To stop the application, press `CTRL+C` in the terminal or run:

  ```bash
  docker-compose down
  ```

Enjoy using the Taskly App!
