import Message from "../models/messageModel.js";

export const socketHandler = (socket, io) => {
  // Listen for new messages and broadcast to other clients
  socket.on('sendMessage', async (data) => {
    try {
      // Save the message to MongoDB
      const message = new Message(data);
      await message.save();

      // Emit to all clients in the chatroom
      io.to(data.chatId).emit('newMessage', message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  // Join chatroom
  socket.on('joinChatroom', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chatroom ${chatId}`);
  });
};
