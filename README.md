# Internship Tracker

A full-stack mini application built using **FastAPI**, **React (Vite)**, and **PostgreSQL**.  
The application allows users to **add**, **view**, and **delete** internship applications.

---

## Tech Stack

- Frontend: React (Vite)
- Backend: FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy
- Styling: Plain CSS
- Tools: pgAdmin 4, Node.js, Python

---

## Project Structure

```
internship-tracker/
├── backend/
│   ├── __pycache__/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── venv/
└── README.md
```

---

## Features Implemented

- Add internship (Company, Role, Status)
- View internships in a table format
- Delete internships
- Single-page UI with page switching:
  - Home
  - Add Internship
  - View Internships
  - Delete Internship

---

## Backend Setup

### 1. Create virtual environment
```bash
python -m venv venv
```

### 2. Activate virtual environment (Windows PowerShell)
```bash
venv\Scripts\Activate.ps1
```

### 3. Install backend dependencies
```bash
pip install -r backend/requirements.txt
```

---

## PostgreSQL Setup

- PostgreSQL is installed locally on the system
- pgAdmin 4 is used to manage the database

### Database Configuration

- Database Name: `internship_db`
- Username: `postgres`
- Password: `postgres123`
- Port: `5432`

The database connection is configured in `backend/database.py`.

Tables are automatically created using SQLAlchemy when the backend server starts.

---

## Run Backend Server

From the project root directory:

```bash
uvicorn backend.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

The frontend was created using **Vite** (not manually).

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Run frontend development server
```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## CORS Configuration

CORS is enabled in the backend to allow frontend-backend communication:

```python
allow_origins=["http://localhost:5173"]
```

---

## How the Application Works

- Frontend communicates with backend using `fetch()`
- Backend API endpoints:
  - `POST /internships` → Add internship
  - `GET /internships` → View internships
  - `DELETE /internships/{id}` → Delete internship
- Page navigation is handled using React state (no routing library)

---

## Internship Status Field

The status field is manually entered by the user.

Common examples:
- Applied
- Interview
- Rejected
- Selected

Updating status in this version is done by deleting and re-adding an entry.

---

## Notes

- No external UI libraries were used
- Styling is done using plain CSS
