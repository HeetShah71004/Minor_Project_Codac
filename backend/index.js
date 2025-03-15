import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes.js";
import editor from "./controllers/socketController.js";

import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Handle WebSocket events
editor(io);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
