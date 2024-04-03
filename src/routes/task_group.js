import express from "express";
import {
  CREATE_TASK_GROUP,
  GET_ALL_TASK_GROUPS,
} from "../controllers/task_group.js";
const router = express.Router();

router.post("/group", CREATE_TASK_GROUP);
router.get("/group/:id", GET_ALL_TASK_GROUPS);

export default router;
