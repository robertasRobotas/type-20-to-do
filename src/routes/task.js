import express from "express";
import {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  GET_PAGINATED_TASKS,
  UPDATE_TASK_BY_ID,
  DELETE_TASK_BY_ID,
} from "../controllers/task.js";
import auth from "../middlewares/auth.js";
import validation from "../middlewares/validation.js";
import taskValidationSchema from "../validationSchema/task.js";

const router = express.Router();

router.post("/tasks", validation(taskValidationSchema), auth, CREATE_TASK);
router.get("/tasks", auth, GET_ALL_TASKS);
router.get("/tasks/pagination/:page", GET_PAGINATED_TASKS);
router.get("/tasks/:id", auth, GET_TASK_BY_ID);
router.put("/tasks/:id", auth, UPDATE_TASK_BY_ID);
router.delete("/tasks/:id", auth, DELETE_TASK_BY_ID);

export default router;
