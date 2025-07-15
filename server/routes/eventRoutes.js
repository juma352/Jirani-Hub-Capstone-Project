import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  rsvpEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', getEvents);
router.post('/:id/rsvp', protect, rsvpEvent);

export default router;
