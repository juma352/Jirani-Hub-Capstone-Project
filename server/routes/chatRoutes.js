import express from 'express';
import { getOrCreateChat, addMessage, getChatMessages } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/get-or-create')
  .post(protect, getOrCreateChat);

router.route('/add-message')
  .post(protect, addMessage);

router.route('/:chatId/messages')
  .get(protect, getChatMessages);

export default router;
