const BASE = "http://localhost:5000/tasks";

export const getTasks = (search = "") =>
  fetch(`${BASE}${search ? `?search=${encodeURIComponent(search)}` : ""}`).then((r) => r.json());

export const createTask = (data) =>
  fetch(BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then((r) => r.json());

export const updateTask = (id, data) =>
  fetch(`${BASE}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then((r) => r.json());

export const toggleTask = (id) =>
  fetch(`${BASE}/${id}/toggle`, { method: "PATCH" }).then((r) => r.json());

export const deleteTask = (id) =>
  fetch(`${BASE}/${id}`, { method: "DELETE" }).then((r) => r.json());
