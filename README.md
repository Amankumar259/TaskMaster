# TaskMaster Pro - Full-Stack Backend Management System

A production-ready task management system built for a Backend Developer Internship assignment. This project demonstrates modular architecture, RESTful API design, Role-Based Access Control (RBAC), and secure authentication practices.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Implemented with Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with Secure Cookie/Bearer support
- **Encryption**: Bcrypt for password hashing
- **Validation**: express-validator & TypeScript type safety
- **Frontend**: React (Vite), Tailwind CSS, Axios, Lucide Icons, Framer Motion

## 🏗️ Architecture

The backend follows a **Modular Layered Architecture**:
- `controllers/`: Request handling and orchestration
- `routes/`: Endpoint definitions and nested routing
- `middlewares/`: Auth, RBAC, and global error handling
- `models/`: Mongoose schemas and models
- `config/`: Database clients and environment configuration
- `validators/`: Input sanitization and validation schemas
- `utils/`: Reusable helper classes (e.g., custom ErrorResponse)

## 🔑 Authentication & RBAC

1. **Registration**: Hashes passwords using `bcrypt` (10 rounds).
2. **Login**: Verifies credentials and generates a JWT signed with a secret.
3. **Protection**: `protect` middleware extracts JWT from headers or cookies and attaches user info to `req.user`.
4. **RBAC**: `authorize('admin')` middleware allows role-specific access.
   - **Users**: Can only CRUD their own tasks.
   - **Admins**: Can see all tasks from all users (Audit view).

## 📡 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Create new account
- `POST /api/v1/auth/login` - Authenticate user & get token
- `GET /api/v1/auth/me` - Get current user profile (Private)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (User's own or all if Admin)
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:id` - Get task details
- `PUT /api/v1/tasks/:id` - Update task (Ownership verified)
- `DELETE /api/v1/tasks/:id` - Delete task (Ownership verified)

## 📈 Scalability Considerations

1. **Database Swapping**: Using Mongoose allows high scalability with MongoDB's sharding and replication capabilities.
2. **Horizontal Scaling**: The app is stateless (JWT). To scale, we would:
   - Use MongoDB Atlas (Managed DB).
   - Use **Redis** for session blacklisting or caching high-traffic task queries.
   - Containerize with **Docker** for orchestration (Kubernetes).
3. **Microservices**: The "Tasks" and "Auth" modules are decoupled. They can be moved into separate services with minimal refactoring.

## 🛠️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure Environment**:
   - Copy `.env.example` to `.env`
   - Set `MONGO_URI="mongodb://your_mongo_uri"`
   - Set `JWT_SECRET="your_secret"`
3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🔐 Security Best Practices Implemented

- **No Sensitive Data Exposure**: Password fields are excluded from responses.
- **Input Sanitization**: All POST/PUT data validated via `express-validator`.
- **Helmet**: Security headers added via `helmet` middleware.
- **Error Handling**: Global error controller with Mongoose-specific handlers (CastError, ValidationError).
- **Atomic Operations**: Controlled updates through Mongoose models.

---
*Developed as a Backend Internship Assessment Project.*

