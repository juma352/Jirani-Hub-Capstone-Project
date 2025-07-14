import Chat from '../models/Chat.js';

// Create or get chat for a listing and participants
export const getOrCreateChat = async (req, res) => {
  try {
    const { listingId, participantIds } = req.body;

    let chat = await Chat.findOne({
      listing: listingId,
      participants: { $all: participantIds, $size: participantIds.length }
    });

    if (!chat) {
      chat = new Chat({
        listing: listingId,
        participants: participantIds,
        messages: []
      });
      await chat.save();
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add message to chat
export const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    chat.messages.push({ sender: senderId, message });
    await chat.save();

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get chat messages by chat ID
export const getChatMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId).populate('messages.sender', 'name');
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    res.status(200).json({ success: true, messages: chat.messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


