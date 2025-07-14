import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  deleteListing,
} from '../controllers/listingController.js';

import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.array('images', 5), createListing);
router.get('/', getListings);
router.get('/:id', getListingById);
router.delete('/:id', protect, deleteListing);

export default router;
