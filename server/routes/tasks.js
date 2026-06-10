const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");
const router = express.Router();

const FILE = "./data/tasks.json";

const read = () => JSON.parse(fs.readFileSync(FILE, "utf-8"));
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  const { search } = req.query;
  let tasks = read();
  if (search) tasks = tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const task = { id: randomUUID(), title, description: description || "", dueDate: dueDate || null, completed: false, createdAt: new Date().toISOString() };
  const tasks = read();
  tasks.push(task);
  write(tasks);
  res.status(201).json(task);
});

router.put("/:id", (req, res) => {
  const tasks = read();
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id };
  write(tasks);
  res.json(tasks[idx]);
});

router.patch("/:id/toggle", (req, res) => {
  const tasks = read();
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks[idx].completed = !tasks[idx].completed;
  write(tasks);
  res.json(tasks[idx]);
});

router.delete("/:id", (req, res) => {
  const tasks = read();
  const filtered = tasks.filter((t) => t.id !== req.params.id);
  if (filtered.length === tasks.length) return res.status(404).json({ error: "Task not found" });
  write(filtered);
  res.json({ message: "Deleted" });
});

module.exports = router;
