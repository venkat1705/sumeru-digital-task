import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/database.js";
import { app, server } from "./lib/socket.js";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Database connection
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: [
    //   "http://localhost:4173",
    //   "http://localhost:5173",
    //   "https://lh3.googleusercontent.com/",
    // ],
    origin: [
      "https://sumeru-digital-task.onrender.com",
      "https://lh3.googleusercontent.com/",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Error Handling
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    res
      .status(413)
      .json({ message: "Payload too large. Please upload smaller files." });
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
