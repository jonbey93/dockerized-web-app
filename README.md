# Project Scope: Dockerized Full-Stack Web Application

## 1️⃣ Objective

Build a full-stack web application with:

- **Frontend:** React + Vite for a modern, reactive user interface.
- **Backend:** Python Flask API with SQLAlchemy ORM.
- **Database:** MySQL for persistent user and profile data.
- **Development Environment:** Fully Dockerized for consistency and isolation across machines, including Windows.

The project should support **fast iterative development** using Hot Module Replacement (HMR) for frontend changes and live reload for backend code.

---

## 2️⃣ Functional Components

### Frontend (`frontend/`)

**Pages/Components:**

- Landing Page
- Login Page
- Register Page
- Dashboard
- Profile

**Context:**

- `AuthContext` for managing user authentication state

**API:**

- `api.js` for HTTP calls to Flask backend

**HMR Considerations:**

- Vite’s dev server is used with `--host` to allow external access from Windows host.
- File changes are detected using polling (`usePolling: true`) to overcome Windows Docker volume limitations.
- Volume mount: `./frontend:/app` ensures local file changes are reflected inside the container.

---

### Backend (`backend/`)

**Files:**

- `app.py`: Flask app entry point
- `config.py`: Database credentials, secret keys
- `models.py`: SQLAlchemy models (`User`, `Profile`)
- `routes/`: `auth.py` (login, register, logout), `users.py` (CRUD)
- `utils.py`: password hashing, JWT helpers

**HMR / Live Reload Considerations:**

- Backend code changes require Flask’s debug mode enabled (`FLASK_ENV=development`) for automatic reload.
- Volume mount: `./backend:/app` allows code edits on host to trigger reload in container.

---

### Database (MySQL)

**Tables:**

- `users`: ID, name, email, password hash, created_at
- `profiles`: user-specific info, linked to `users`

- Persistent data using Docker volumes (`db_data`) so that data survives container restarts.
- Connection handled via environment variables in `.env`.

---

## 3️⃣ Docker Architecture

**Services:**

- `frontend`: React + Vite container
- `backend`: Flask container
- `db`: MySQL container

**Volume Mounts:**

- Ensure local code changes are reflected in containers (critical for HMR).

**Port Mapping:**

- `frontend`: 5173 → host
- `backend`: 5000 → host
- `db`: 3306 → host

**HMR Considerations in Docker:**

- Windows filesystem events don’t propagate reliably; polling is required.
- Vite dev server must bind to `0.0.0.0` (`--host`) to be accessible from the host machine.
- Avoid CJS warnings by using the CLI `vite` via `npm run dev` instead of programmatic Node API.

---

## 4️⃣ Development Workflow

1. Run all services with Docker Compose:

```bash
docker-compose up --build
