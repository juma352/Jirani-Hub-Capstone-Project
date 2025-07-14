import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { listing, quantity, totalPrice } = req.body;
    if (!listing || !totalPrice) {
      return res.status(400).json({ message: 'Listing and totalPrice are required' });
    }
    const order = await Order.create({
      listing,
      buyer: req.user.id,
      quantity: quantity || 1,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const orders = await Order.find({ buyer: req.user.id }).populate('listing').populate('buyer', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
