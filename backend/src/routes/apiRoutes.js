import express from "express";
import editor  from "../controllers/socketController.js";
const router = express.Router();

// Test API route

router.get("/editor", editor);

export default router;