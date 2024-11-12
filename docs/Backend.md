# Backend Documentation

## Overview
The backend is built with **Express** and **SQLite** to provide a simple RESTful API for managing expenses.

## Setup

1. **Database**: Ensure `expenses.db` is created in the root directory.
2. **Express Setup**: The server runs on port 4000 by default. You can change this in `server.js`.

## API Endpoints

### GET /api/expenses
Fetches all expenses from the database.

**Response**:
```json
{
  "data": [
    { "id": 1, "description": "Groceries", "amount": 50, "date": "2023-01-01", "category": "food" },
    ...
  ]
}
