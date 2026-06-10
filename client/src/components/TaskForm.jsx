import { useState, useEffect } from "react";

const empty = { title: "", description: "", dueDate: "" };

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(editTask ? { title: editTask.title, description: editTask.description, dueDate: editTask.dueDate || "" } : empty);
    setError("");
  }, [editTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");
    onSubmit(form);
    setForm(empty);
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editTask ? "Edit Task" : "Add Task"}</h2>
      {error && <p className="error">{error}</p>}
      <input name="title" placeholder="Title *" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={2} />
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      <div className="form-actions">
        <button type="submit">{editTask ? "Update" : "Add Task"}</button>
        {editTask && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
