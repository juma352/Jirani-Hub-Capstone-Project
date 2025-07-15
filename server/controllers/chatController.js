import Chat from '../models/Chat.js';

// Create or get chat for a listing and participants
export const getOrCreateChat = async (req, res) => {
  try {
    console.log('getOrCreateChat request body:', req.body);
    const { listingId, participantIds } = req.body;

    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return res.status(400).json({ success: false, error: 'participantIds must be a non-empty array' });
    }

    let query = {
      participants: { $all: participantIds, $size: participantIds.length }
    };

    if (listingId) {
      query.listing = listingId;
    }

    console.log('getOrCreateChat query:', query);

    let chat = await Chat.findOne(query);

    if (!chat) {
      const chatData = {
        participants: participantIds,
        messages: []
      };
      if (listingId) {
        chatData.listing = listingId;
      }
      chat = new Chat(chatData);
      await chat.save();
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error('Error in getOrCreateChat:', error);
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


