import express from "express";
import { retrieveUsers } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", requireAuth, retrieveUsers);

export default router;
