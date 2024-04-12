import express from "express";
import { SIGN_UP, LOG_IN } from "../controllers/user.js";
const router = express.Router();

router.post("/users", SIGN_UP);
router.post("/users/login", LOG_IN);

export default router;
