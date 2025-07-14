import express from 'express';
import { getAlerts, createAlert, deactivateAlert, acknowledgeAlert } from '../controllers/alertController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for alerts
router.route('/')
  .get(protect, getAlerts)
  .post(protect, authorize('admin', 'moderator'), createAlert);

router.route('/:id/deactivate')
  .put(protect, authorize('admin', 'moderator'), deactivateAlert);

router.route('/:id/acknowledge')
  .put(protect, acknowledgeAlert);

export default router;
