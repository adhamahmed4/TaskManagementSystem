# Task Management System

A powerful task management system to help you stay organized and productive.

## Table of Contents

    1. Introduction
    2. Project Structure
    3. Environment Setup
    4. Backend Setup
    5. Frontend Setup
    6. API Endpoints
    7. Features
    8. Principles and Methodologies
    9. Running the Application
    10. Dependencies
    11. Developer

## Introduction

The Task Management System is a web application designed to help users manage their tasks efficiently. It is built with a Node.js backend and a React frontend, using SQL Server as the database.

## Project Structure

- TaskManagementSystem/

  - Backend/

    - config/
      - dbConfig.js
    - controllers/
      - authController.js
      - taskController.js
    - middlewares/
      - authMiddleware.js
    - models/
      - taskModel.js
      - userModel.js
    - node_modules/
    - routes/
      - authRoutes.js
      - taskRoutes.js
    - .env
    - index.js
    - package-lock.json
    - package.json

  - Frontend/
    - node_modules/
    - public/
      - vite.svg
    - src/
      - assets/
      - components/
      - hooks/
      - services/
      - App.css
      - App.jsx
      - index.css
      - main.jsx
    - .env
    - .eslintrc.cjs
    - index.html
    - package-lock.json
    - package.json
    - postcss.config.js
    - tailwind.config.js
    - vite.config.js
  - .gitignore
  - README.md

## Tech Stack

**Client:** React, react-router-dom, TailwindCSS, Daisy UI

**Server:** Node, Express, SQL Server

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

`PORT=3000`
`DB_USER=sa`
`DB_PASSWORD=_Rs142723`
`DB_SERVER=localhost`
`DB_NAME=TaskManagementDB`
`SECRET_KEY=_Rs142723`

### Frontend

`VITE_API_URL=http://localhost:3000`

## Installation

Install project with npm

### Backend Setup

1. Navigate to the `backend` directory and run:

```bash
  cd backend
  npm install
  nodemon index.js
```

2. Configure the database by creating the tasks and users tables in SQL Server:

#### I use Azure Data Studio because it's cross platform and I use `Ubuntu`

```sql
    CREATE TABLE [dbo].[tasks] (
        [id] INT IDENTITY (1, 1) NOT NULL,
        [title] VARCHAR (255) NOT NULL,
        [description] VARCHAR (255) NULL,
        [status] VARCHAR (50) NOT NULL,
        [created_at] DATETIME DEFAULT (getdate()) NULL,
        [updated_at] DATETIME DEFAULT (getdate()) NULL,
        PRIMARY KEY CLUSTERED ([id] ASC),
        CHECK ([status]='Completed' OR [status]='In Progress' OR [status]='Pending')
    );

    CREATE TABLE [dbo].[users] (
        [id] INT IDENTITY (1, 1) NOT NULL,
        [username] VARCHAR (255) NOT NULL,
        [password] VARCHAR (255) NOT NULL,
        PRIMARY KEY CLUSTERED ([id] ASC),
        UNIQUE NONCLUSTERED ([username] ASC)
    );
```

### Frontend Setup

1. Navigate to the `frontend` directory and run:

```bash
  cd frontend
  npm install
  npm run dev
```

## API Endpoints

### Authentication

#### Register

```http
  POST /api/auth/register
```

Register a new user

#### Login

```http
  POST /api/auth/login
```

Login a user and return a JWT token

### Tasks

#### Retrieve Tasks

```http
  GET /api/tasks
```

#### Retrieve Task By ID

```http
  GET /api/tasks/:id
```

#### Create A Task

```http
  POST /api/tasks
```

#### Update A Task

```http
  UPDATE /api/tasks/:id
```

#### Delete A Task

```http
  DELETE /api/tasks/:id
```

### Notes

1. In **POST** request you should add in the body `json` for example:

```json
{
  "title": "New Task",
  "description": "Task Description",
  "status": "Pending"
}
```

2. In **Login** and **Register** you should add in the body `json` for example:

```json
{
  "username": "seif",
  "password": "seifAdmin"
}
```

3. When You **Login** the response will contain **auth** and **token**(JWT) for example:

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwMjc0OTk3LCJleHAiOjE3MjAzNjEzOTd9.3OrbxsMmsT3Dy1UoiNsqaYzT6Bt_BWAwnlLvr9FngCU"
}
```

4. The **JWT** token should add in **header** for example:

```js
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwMjc0OTk3LCJleHAiOjE3MjAzNjEzOTd9.3OrbxsMmsT3Dy1UoiNsqaYzT6Bt_BWAwnlLvr9FngCU"
```

## Features

- **Register:** Allows users to create an account.
- **Login:** Allows users to login and obtain a JWT token for authenticated requests.
- **Create Task:** Users can create new tasks with a title, description, and status.
- **View Tasks:** Users can view a list of all their tasks.
- **Edit Task:** Users can edit the details of an existing task.
- **Delete Task:** Users can delete tasks they no longer need.
- **Modern UI:** Use Tailwind CSS and Daisy UI to create simple and modern user interface.

## Principles and Methodologies

### Agile Methodology

The project follows Agile principles to ensure iterative development, continuous improvement, and customer satisfaction through early and continuous delivery of valuable software. Key aspects include:

- **Iteration:** The project is divided into short, time-boxed iterations (sprints), each delivering a potentially shippable product increment.
- **Collaboration:** Close collaboration between team members and stakeholders to gather feedback and make necessary adjustments.
- **Flexibility:** Ability to adapt to changing requirements, even late in the development process.
- **Customer-Centric:** Focus on delivering valuable features to the end-users based on their feedback and requirements.

### Design Principles

- **SOLID Principles:** Ensuring that the codebase adheres to SOLID principles for better maintainability and scalability.

  - **Single Responsibility Principle:** Each module/class should have a single responsibility.
  - **Open/Closed Principle:** Software entities should be open for extension but closed for modification.
  - **Liskov Substitution Principle:** Subtypes should be substitutable for their base types.
  - **Interface Segregation Principle:** Clients should not be forced to depend on interfaces they do not use.
  - **Dependency Inversion Principle:** Depend on abstractions, not concretions.

- **KISS (Keep It Simple, Stupid):** Aim to keep the code simple and avoid unnecessary complexity.
- **DRY (Don't Repeat Yourself):** Reduce the repetition of code by abstracting common functionality.
- **Separation of Concerns:** Clear separation between different parts of the application (frontend, backend, database) to ensure modularity and maintainability.
- **RESTful APIs:** Following REST principles for designing the API endpoints, ensuring a consistent and predictable interface for clients.
- **Security:** Implementing JWT-based authentication to secure API endpoints and protect user data.
- **Scalability:** Designing the system to handle increasing loads by utilizing efficient database queries and optimizing server performance.

## Running the Application

- Open your browser and navigate to http://localhost:5173 to access the frontend.
- Use Postman or any API client to test the backend endpoints at http://localhost:3000/api/tasks.

## Dependencies

**Backend**

- bcryptjs
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- mssql

**Frontend**

- axios
- react
- react-dom
- react-router-dom
- daisyui
- tailwindcss
- vite

## Lessons Learned

I learned to interact with SQL Server using Azure Data Studio.

## Developer

- [Seif Eldin Sameh](https://seifeldin.vercel.app)
