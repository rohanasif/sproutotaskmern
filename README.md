# MERN Stack Task

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that implements a task management system.

## Project Structure

The project is organized into two main directories:

### Backend (`backend/`)

- Node.js/Express.js server
- MongoDB database integration
- RESTful API endpoints
- JWT authentication
- Environment configuration

### Frontend (`frontend/`)

- React.js application
- Redux for state management
- Material-UI components
- Protected routes
- User authentication

## Features

- User authentication (login/register)
- Task management (create, read, update, delete)
- Protected routes
- Responsive design
- JWT-based authentication
- MongoDB database integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone github.com/rohanasif/sproutotaskmern
cd sproutotaskmern
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:

   - Create `.env` file in the backend directory
   - Add required environment variables (see `.env.example`)

5. Start the development servers:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user profile

### Tasks

- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cors
- dotenv

### Frontend

- React.js
- Redux Toolkit
- Material-UI
- React Router
- Axios
- JWT-decode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
