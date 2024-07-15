const Message = require("../models/Message"); // import Message model

// Get all messages (could be paginated)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const {message} = req.body;
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error("Error creating message");
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
};

// Update a message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: "Error updating message" });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
  updateMessage,
};
