import express from 'express';
import { getAnnouncements, createAnnouncement, deactivateAnnouncement } from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAnnouncements)
  .post(protect, authorize('admin', 'moderator'), createAnnouncement);

router.route('/:id/deactivate')
  .put(protect, authorize('admin', 'moderator'), deactivateAnnouncement);

export default router;
