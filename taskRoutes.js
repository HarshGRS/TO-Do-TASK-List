const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post("/", async (req, res) => {
  const { task, dueDate } = req.body;
  const newTask = new Task({ task, dueDate });
  await newTask.save();
  res.status(201).json(newTask);
});

module.exports = router;