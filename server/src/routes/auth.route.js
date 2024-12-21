import express from "express";
import {
  checkAuth,
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.post("/logout", logout);
router.get("/check-auth", requireAuth, checkAuth);

export default router;
