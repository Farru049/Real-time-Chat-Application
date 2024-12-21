import MessageModel from "../models/messageModel.js";

// Creating a new message
export const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, message } = req.body;
        
        if (!chatId || !senderId || !message) {
            return res.status(400).json({
                error: "All fields must be filled",
                missing: {
                    chatId: !chatId,
                    senderId: !senderId,
                    message: !message
                }
            });
        }

        const newMessage = await MessageModel.create({
            chatId,
            senderId,
            message
        });

        console.log("Message created successfully:", newMessage);
        res.status(201).json(newMessage);

    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({
            error: 'Failed to send a message',
            details: err.message
        });
    }
};

// Getting all messages for specific chatroom
export const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        
        if (!chatId) {
            return res.status(400).json({ error: "Chat ID is required" });
        }

        const messages = await MessageModel.find({ chatId })
            .sort({ timestamp: 1 })
            .populate('senderId', 'username'); // Assuming you want sender details

        res.status(200).json(messages);
        
    } catch (err) {
        console.error("Error fetching chat messages:", err);
        res.status(500).json({
            error: "Failed to fetch messages",
            details: err.message
        });
    }
};

// Getting all messages from a specific user
export const getMessagesByUser = async (req, res) => {
    try {
        const { senderId } = req.params;
  
        if (!senderId) {
            return res.status(400).json({ error: "Sender ID is required" });
        }
  
        const userMessages = await MessageModel.find({ senderId })
            .sort({ timestamp: -1 })
            .populate('chatId', 'name'); // Assuming chatrooms have names

        res.status(200).json(userMessages);
        
    } catch (err) {
        console.error("Error fetching user messages:", err);
        res.status(500).json({
            error: "Failed to fetch user messages",
            details: err.message
        });
    }
};