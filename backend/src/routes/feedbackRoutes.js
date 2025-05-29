import { Router } from "express";
const router = Router();
import Feedback from "../models/Feedback.js";

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
