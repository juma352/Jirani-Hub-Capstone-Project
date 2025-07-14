import express from 'express';
import { getAlerts, createAlert, deactivateAlert } from '../controllers/alertController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for alerts
router.route('/')
  .get(getAlerts)
  .post(protect, authorize('admin', 'moderator'), createAlert);

router.route('/:id/deactivate')
  .put(protect, authorize('admin', 'moderator'), deactivateAlert);

export default router;
