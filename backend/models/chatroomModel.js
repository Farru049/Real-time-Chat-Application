import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false, // False for 1-on-1 chats, true for group chats
    },
    name: {
      type: String,
      default: "", // Optional name for group chats
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const ChatroomModel = mongoose.model("Chatroom", chatRoomSchema);

export default ChatroomModel;
