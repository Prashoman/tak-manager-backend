# Task Manager Backend

This is the backend service for the Task Manager Application. It provides APIs for managing User Authentication, Task Management, and Real-time Updates. Users can create, update, and track tasks with due dates and statuses while receiving live updates via WebSockets.

## Features

- User authentication and authorization
- Task Management

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Zod validation
- JWT for authentication
- Smtp

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone project
   ```
2. Navigate to the project directory:
   ```bash
   cd
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_TOKEN=5d
   jWT_REFRESH_TOKEN_SECRET=token
   JWT_REFRESH_TOKEN_EXPIRES=expires date
   SMTP_PASS=your pass
   FRONTEND_URL= your url
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. The server will be running on `http://localhost:5000`.

## API Documentation

### User Authentication and Management

#### Register a new user
- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "userName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "userName": "string",
      "email": "string",
      "role": "user",
      "profileImage": "string",
      "bio": "string"
    }
  }
  ```

#### User login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Logs in a user.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "string",
    "data": {
      "userName": "string",
      "email": "string",
      "role": "user",
      "profileImage": "string",
      "bio": "string"
    }
  }
  ```

#### Get user profile
- **Endpoint:** `GET /api/auth/profile`
- **Description:** Retrieves the profile of the logged-in user.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile fetched successfully",
    "data": {
      "userName": "string",
      "email": "string",
      "role": "user",
      "profileImage": "string",
      "bio": "string"
    }
  }
  ```

#### Update user profile
- **Endpoint:** `PUT /api/auth/profile`
- **Description:** Updates the profile of the logged-in user.
- **Request Body:**
  ```json
  {
    "userName": "string",
    "email": "string",
    "profileImage": "string",
    "bio": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
      "userName": "string",
      "email": "string",
      "role": "user",
      "profileImage": "string",
      "bio": "string"
    }
  }
  ```

#### Change password
- **Endpoint:** `POST /api/auth/change-password`
- **Description:** Changes the password of the logged-in user.
- **Request Body:**
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password changed successfully",
    "data": {}
  }
  ```

#### Forgot password
- **Endpoint:** `POST /api/auth/forgot-password`
- **Description:** Sends a password reset link to the user's email.
- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset link sent to your email",
    "data": "string"
  }
  ```

#### Reset password
- **Endpoint:** `POST /api/auth/reset-password`
- **Description:** Resets the user's password using the reset link.
- **Request Body:**
  ```json
  {
    "id": "string",
    "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Password reset successfully",
    "data": {}
  }
  ```

### Task Management

#### Create a new task
- **Endpoint:** `POST /api/tasks`
- **Description:** Creates a new task.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "dueDate": "YYYY-MM-DD"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "user": "string",
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD",
      "status": "pending"
    }
  }
  ```

#### Get all tasks
- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieves all tasks.
- **Response:**
  ```json
  {
    "success": true,
    "message": "All tasks retrieved successfully",
    "data": {
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 100,
        "totalPage": 10
      },
      "result": [
        {
          "user": "string",
          "title": "string",
          "description": "string",
          "dueDate": "YYYY-MM-DD",
          "status": "pending"
        }
      ]
    }
  }
  ```

#### Get task by ID
- **Endpoint:** `GET /api/tasks/:id`
- **Description:** Retrieves a task by its ID.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task retrieved successfully",
    "data": {
      "user": "string",
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD",
      "status": "pending"
    }
  }
  ```

#### Update a task
- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Updates a task by its ID.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "dueDate": "YYYY-MM-DD",
    "status": "pending"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "user": "string",
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD",
      "status": "pending"
    }
  }
  ```

#### Delete a task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Deletes a task by its ID.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": {}
  }
  ```

### Error Handling

#### Global Error Handler
- **Description:** Handles all errors globally and returns a structured error response.
- **Response:**
  ```json
  {
    "success": false,
    "message": "string",
    "errorSources": [
      {
        "path": "string",
        "message": "string"
      }
    ],
    "stack": "string"
  }
  ```

#### Not Found Handler
- **Description:** Handles requests to undefined routes.
- **Response:**
  ```json
  {
    "success": false,
    "message": "API Not Found !!",
    "error": ""
  }
  ```

This documentation provides detailed explanations of the API endpoints, including the request and response formats.