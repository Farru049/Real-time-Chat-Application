import express from "express";
import {
  createChatroom,
  getUserChatrooms,
  getChatroomDetails,
} from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new chatroom
router.post("/create", authenticate, createChatroom);

// Get all chatrooms for the authenticated user
router.get("/user", authenticate, getUserChatrooms);

// Get details of a specific chatroom
router.get("/:chatId", authenticate, getChatroomDetails);

export default router;
