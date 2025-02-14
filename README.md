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
