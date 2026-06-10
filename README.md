# 📝 Personal Task Manager

## How I Built This

Before writing any code, I asked **ChatGPT** to help me plan out the folder structure and figure out what technologies to use. That gave me a solid starting point knowing I'd need a Node.js + Express backend, a React frontend, and how to organize the files.

From there, I watched a few **YouTube videos** to get an idea of what the end product should look like and how full-stack apps like this are generally built. That helped me understand the flow between frontend and backend before I started coding.

Once I started building, whenever I got stuck on something like wiring up the API calls, handling the overdue logic, or fixing a Node.js version issue  I used **Amazon Q in VS Code** to help me work through it and keep moving forward.

The README you are reading right now was also written with the help of **ChatGPT**.

---

## What It Does

A full-stack personal task manager where you can create, manage, and track your tasks all saved to a local JSON file so your data persists between sessions.

---

## Features

- ✅ Add tasks with a title, description, and due date
- ✏️ Edit existing tasks inline
- 🗑️ Delete tasks with a confirmation prompt
- ☑️ Mark tasks as complete or incomplete
- 🔍 Search tasks by title in real time
- 🗂️ Filter tasks — All / Active / Completed
- 🔢 Live counts for Active and Completed tasks
- ⚠️ Overdue tasks are automatically highlighted in red
- 💾 All tasks are saved to a `tasks.json` file (no database needed)
- 📱 Responsive UI — works on mobile and desktop

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React + Vite            |
| Backend  | Node.js + Express       |
| Storage  | JSON file (tasks.json)  |
| Styling  | Plain CSS               |

---

## Project Structure

```
personal-task-manager/
│
├── client/                   # React frontend
│   └── src/
│       ├── components/
│       │   ├── TaskForm.jsx  # Add / Edit form
│       │   ├── TaskItem.jsx  # Single task row
│       │   └── TaskList.jsx  # List + empty state
│       ├── pages/
│       │   └── Home.jsx      # Main page with all logic
│       ├── api.js            # All fetch calls to backend
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css         # All styles
│
├── server/                   # Express backend
│   ├── routes/
│   │   └── tasks.js          # All API route handlers
│   ├── data/
│   │   └── tasks.json        # Persistent task storage
│   └── server.js             # Entry point
│
└── README.md
```

---

## How to Clone and Run on Your Computer

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18 or higher (v20+ recommended)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/personal-task-manager.git
cd personal-task-manager
```

---

### Step 2 — Start the Backend

```bash
cd server
npm install
node server.js
```

You should see:
```
Server running on http://localhost:5000
```

---

### Step 3 — Start the Frontend

Open a **second terminal**, then:

```bash
cd client
npm install
npm run dev
```

You should see:
```
VITE ready on http://localhost:5173
```

---

### Step 4 — Open the app

Go to **http://localhost:5173** in your browser.

> Make sure both the backend (port 5000) and frontend (port 5173) are running at the same time.

---

## API Endpoints

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | /tasks              | Get all tasks           |
| GET    | /tasks?search=query | Search tasks by title   |
| POST   | /tasks              | Create a new task       |
| PUT    | /tasks/:id          | Update a task           |
| PATCH  | /tasks/:id/toggle   | Toggle complete status  |
| DELETE | /tasks/:id          | Delete a task           |

---

## How It Works

1. The React frontend runs in your browser and talks to the Express backend via fetch calls defined in `api.js`
2. The backend reads and writes tasks to `server/data/tasks.json` no database setup needed
3. Every action (add, edit, delete, toggle) immediately updates the file so your tasks are saved even if you restart the server
4. Overdue detection happens on the frontend any task with a due date in the past that isn't completed gets highlighted automatically

---

## 🚀 Live Demo

**[https://personal-task-manager-inky.vercel.app](https://personal-task-manager-inky.vercel.app)**

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://personal-task-manager-inky.vercel.app |
| Backend | Render | https://personal-task-manager-dhqr.onrender.com |
