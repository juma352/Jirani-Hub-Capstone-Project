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
    
    // Populate the listing details for the response
    await order.populate('listing');
    await order.populate('buyer', 'name email');
    
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
    const orders = await Order.find({ buyer: req.user.id })
      .populate('listing')
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const order = await Order.findById(req.params.id)
      .populate('listing')
      .populate('buyer', 'name email');
      
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the user is the buyer or has admin privileges
    if (order.buyer._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const { status } = req.body;
    const validStatuses = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the user is the buyer or has admin privileges
    if (order.buyer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }
    
    order.status = status;
    await order.save();
    
    await order.populate('listing');
    await order.populate('buyer', 'name email');
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};