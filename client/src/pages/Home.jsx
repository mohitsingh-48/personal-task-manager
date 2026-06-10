import { useState, useEffect, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from "../api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    const data = await getTasks(search);
    setTasks(data);
  }, [search]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleSubmit = async (form) => {
    if (editTask) {
      await updateTask(editTask.id, form);
      setEditTask(null);
    } else {
      await createTask(form);
    }
    fetchTasks();
  };

  const handleToggle = async (id) => { await toggleTask(id); fetchTasks(); };
  const handleDelete = async (id) => { await deleteTask(id); fetchTasks(); };

  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      <TaskForm onSubmit={handleSubmit} editTask={editTask} onCancel={() => setEditTask(null)} />

      <div className="toolbar">
        <input className="search-input" placeholder="🔍 Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="filters">
          {["all", "active", "completed"].map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="stats">
        <span className="stat active-stat">Active: {active}</span>
        <span className="stat completed-stat">Completed: {completed}</span>
      </div>

      <TaskList tasks={tasks} filter={filter} onToggle={handleToggle} onEdit={setEditTask} onDelete={handleDelete} />
    </div>
  );
}
