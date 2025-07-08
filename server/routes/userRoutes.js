import express from 'express';
import { getAllUsers, getUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserProfile);

export default router;
