
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addService,
  getServices,
  getServiceByUser,
} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', protect, addService);
router.get('/', getServices);
router.get('/user/:userId', getServiceByUser);

export default router;
