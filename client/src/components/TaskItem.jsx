export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date(new Date().toDateString());

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task.id);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.description && <p className="task-desc">{task.description}</p>}
        {task.dueDate && (
          <span className="task-due">
            Due: {new Date(task.dueDate + "T00:00:00").toLocaleDateString()}
            {isOverdue && <span className="overdue-badge"> ⚠ Overdue</span>}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}
