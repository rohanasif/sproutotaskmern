# MERN Stack Todos Management Application

This is a modern MERN (MongoDB, Express.js, React.js, Node.js) stack application that implements a secure and responsive todo management system.

## Project Structure

The project is organized into two main directories:

### Backend

- Node.js with ES modules
- Express.js for API routing
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- express-validator for request validation
- cors for Cross-Origin Resource Sharing
- dotenv for environment configuration
- nodemon for development

### Frontend

- React.js with Vite
- Material-UI (MUI) components
- Tailwind CSS for styling
- React Router v7 for routing
- Formik for form management
- Yup for schema validation
- Axios for API requests
- MUI Icons
- ESLint for code quality

## Features

- User authentication system
  - Register with validation
  - Login with secure password handling
  - Automatic token management
  - Protected routes and API endpoints
- Todo management
  - Create, read, update, delete (CRUD) operations
  - Per-user todo isolation
  - Real-time validation
  - Responsive layout
  - Advanced filtering and sorting capabilities
    - Sort todos by creation date, due date, or priority
    - Filter todos by status (completed/incomplete)
    - Filter todos by priority level
    - Search todos by title or description
    - Real-time search results
- Security features
  - JWT-based authentication
  - Password hashing with bcrypt
  - Input validation and sanitization
  - Protected API endpoints
- Modern UI/UX
  - Material Design components
  - Responsive layout with Tailwind CSS
  - Form validation feedback
  - Loading states and error handling
  - Clean and intuitive interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Modern web browser (for Vite's HMR features)

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
npm run dev
```

For production build:

```bash
cd frontend
npm run build
npm run preview
```

The application will be available at:

- Frontend (Development): http://localhost:5173 (Vite's default port)
- Frontend (Production Preview): http://localhost:4173
- Backend: http://localhost:5000

### Development Features

- Hot Module Replacement (HMR) with Vite
- Fast refresh for React components
- ESLint integration
- TypeScript support
- Optimized production builds

## API Endpoints

### Authentication Routes

- POST `/api/auth/register` - Register a new user (requires validation)
- POST `/api/auth/login` - Login user (requires validation)
- GET `/api/auth/me` - Get current user profile (protected route)
- POST `/api/auth/logout` - Logout user

### Todo Routes (All Protected)

- GET `/api/todos` - Get all todos for the authenticated user
  - Query Parameters:
    - `sort`: Sort todos by field (createdAt, dueDate, priority)
    - `order`: Sort order (asc, desc)
    - `status`: Filter by status (completed, incomplete)
    - `priority`: Filter by priority (high, medium, low)
    - `search`: Search todos by title or description
- POST `/api/todos` - Create a new todo (requires validation)
- GET `/api/todos/:id` - Get a specific todo by ID (requires validation)
- PUT `/api/todos/:id` - Update a todo (requires validation)
- DELETE `/api/todos/:id` - Delete a todo (requires validation)
