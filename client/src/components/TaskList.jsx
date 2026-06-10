import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <span>🗂️</span>
        <p>{filter === "completed" ? "No completed tasks yet." : filter === "active" ? "No active tasks." : "No tasks yet. Add one above!"}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filtered.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
