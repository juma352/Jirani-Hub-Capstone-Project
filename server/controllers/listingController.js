import Listing from '../models/Listing.js';

export const createListing = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    // Log all keys and values in req.body
    Object.keys(req.body).forEach(key => {
      console.log(`req.body[${key}]:`, req.body[key]);
    });

    // Process uploaded files and get their paths
    let imagePaths = [];
    if (req.files) {
      imagePaths = req.files.map(file => file.path);
    }

    // Convert price to number explicitly
    const price = req.body.price ? parseFloat(req.body.price) : undefined;

    // Explicitly extract fields from req.body
    const { title, category, description } = req.body;

    // Create listing with images paths and explicit fields
    const listingData = {
      title,
      category,
      description,
      price,
      postedBy: req.user.id,
      images: imagePaths
    };

    const listing = await Listing.create(listingData);
    res.status(201).json(listing);
  } catch (err) {
    console.error('Error in createListing:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getListings = async (req, res) => {
  const listings = await Listing.find().populate('postedBy', 'name');
  res.json(listings);
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Listing not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

