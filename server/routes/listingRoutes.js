import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  deleteListing,
} from '../controllers/listingController.js';


import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createListing);
router.get('/', getListings);
router.get('/:id', getListingById);
router.delete('/:id', authMiddleware, deleteListing);

export default router;
