import express from "express";
import {
  CREATE_TASK_GROUP,
  GET_ALL_GROUPS,
  GET_TASK_GROUP_BY_ID,
  DELETE_GROUP_BY_ID,
} from "../controllers/task_group.js";
const router = express.Router();

router.post("/groups", CREATE_TASK_GROUP);
router.get("/groups/", GET_ALL_GROUPS);
router.delete("/groups/:id", DELETE_GROUP_BY_ID);
router.get("/groups/:id", GET_TASK_GROUP_BY_ID);
//TODO: add task group deleting endpoint
export default router;
