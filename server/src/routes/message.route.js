import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  retrieveMessages,
  sendMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id", requireAuth, retrieveMessages);
router.post("/send/:id", requireAuth, sendMessages);

export default router;
