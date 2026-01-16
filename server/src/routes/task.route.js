import express from "express";
import {
  deleteTask,
  fetchTasks,
  getTasks,
  updateTasks,
} from "../controllers/task.controllers.js";

const router = express.Router();

router.route("/").get(getTasks).post(fetchTasks);
router.route("/:id").put(updateTasks).delete(deleteTask);

export default router;
