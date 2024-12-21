import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js"; // Import database connection
import userRoutes from "./routes/userRoutes.js";
import chatroomRoutes from "./routes/chatroomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { socketHandler } from './socket/socketHandler.js';
import http from 'http';
import { Server as SocketIO } from "socket.io";  // Correct import for socket.io
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/api/users", userRoutes); // Routes related to users
app.use("/api/chatrooms", chatroomRoutes); // Routes related to chatrooms
app.use("/api", messageRoutes); // Routes related to messages
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com");
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Call the socket handler for messages
  socketHandler(socket, io);
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});