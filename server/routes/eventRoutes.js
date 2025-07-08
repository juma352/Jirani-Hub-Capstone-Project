import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createEvent,
  getEvents,
  rsvpEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getEvents);
router.post('/:id/rsvp', rsvpEvent);

export default router;
