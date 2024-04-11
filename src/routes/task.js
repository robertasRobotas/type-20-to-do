import express from "express";
import {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  GET_PAGINATED_TASKS,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
} from "../controllers/task.js";
const router = express.Router();

router.post("/tasks/:groupId", CREATE_TASK);
router.get("/tasks", GET_ALL_TASKS);
router.get("/tasks/pagination/:page", GET_PAGINATED_TASKS);
router.get("/tasks/:id", GET_TASK_BY_ID);
router.put("/tasks/:id", UPDATE_TASK_BY_ID);
router.delete("/tasks/:id", DELETE_TASK_BY_ID);

export default router;
