import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    tasks,
  });
});

export const fetchTasks = asyncHandler(async (req, res) => {
  const { title, description } = req.body || {};
  if (!title || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const existingTask = await Task.findOne({ title });
  if (existingTask) {
    res.status(400);
    throw new Error("Task with this title already exist");
  }
  const task = await Task.create({
    title,
    description,
  });
  res.status(201).json({
    task,
  });
});
export const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(401);
    throw new Error("Not authorized");
  }

  task.title = req.body.title;
  task.description = req.body.description;
  const updated = await task.save();
  res.status(200).json({
    updated,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json({
    task,
  });
});
