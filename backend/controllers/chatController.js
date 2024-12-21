import ChatroomModel from "../models/chatroomModel.js";

// Create a new chatroom
export const createChatroom = async (req, res) => {
  try {
    const { members, isGroupChat, name } = req.body;

    if (!members || members.length < 2) {
      return res.status(400).json({ error: "A chatroom must have at least two members." });
    }

    const newChatroom = await ChatroomModel.create({
      members,
      isGroupChat,
      name,
    });

    res.status(201).json(newChatroom);
  } catch (err) {
    res.status(500).json({ error: "Failed to create chatroom", details: err.message });
  }
};

// Get all chatrooms for the authenticated user
export const getUserChatrooms = async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user ID from the JWT token

    const chatrooms = await ChatroomModel.find({ members: userId });

    res.status(200).json(chatrooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chatrooms", details: err.message });
  }
};

// Get details of a specific chatroom
export const getChatroomDetails = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chatroom = await ChatroomModel.findById(chatroomId).populate("members", "username email");

    if (!chatroom) {
      return res.status(404).json({ error: "Chatroom not found" });
    }

    res.status(200).json(chatroom);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chatroom details", details: err.message });
  }
};
