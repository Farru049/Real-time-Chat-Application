import express from "express";
import { 
  sendMessage, 
  getMessagesByChat, 
  getMessagesByUser, 
} from '../controllers/messageControllers.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Send a new message
router.post('/messages', authenticate, sendMessage);

// Get all messages for a specific chatroom
router.get("/messages/:chatId", authenticate, getMessagesByChat);

// Get all messages sent by a specific user
router.get("/user/:senderId", authenticate, getMessagesByUser);

export default router;
