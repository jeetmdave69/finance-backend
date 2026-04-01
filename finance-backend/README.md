# Finance Dashboard Backend

This project is a simple backend system for managing financial records with role-based access control.

## Features

- User management with roles (admin, analyst, viewer)
- Financial records CRUD operations
- Dashboard summary (income, expense, balance, category breakdown)
- Role-based access control using middleware
- Basic validation and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

### Users
- POST /api/users → create user
- GET /api/users → get all users

### Records
- POST /api/records → create record (admin only)
- GET /api/records → get records
- PUT /api/records/:id → update (admin only)
- DELETE /api/records/:id → delete (admin only)

### Dashboard
- GET /api/dashboard/summary → get financial summary

## Role-Based Access

Roles are passed via request headers:

Example: