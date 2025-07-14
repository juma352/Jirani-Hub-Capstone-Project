import express from 'express';
import { 
  getAnnouncements, 
  createAnnouncement, 
  deactivateAnnouncement,
  toggleLike,
  addComment
} from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAnnouncements)
  .post(protect, authorize('admin', 'moderator'), createAnnouncement);

router.route('/:id/deactivate')
  .put(protect, authorize('admin', 'moderator'), deactivateAnnouncement);

router.route('/:id/like')
  .put(protect, toggleLike);

router.route('/:id/comment')
  .post(protect, addComment);

export default router;
