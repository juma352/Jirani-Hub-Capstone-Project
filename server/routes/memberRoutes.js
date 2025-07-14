import express from 'express';
import { getMembers, getMemberById } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMembers);

router.route('/:id')
  .get(protect, getMemberById);

export default router;


