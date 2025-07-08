import Service from '../models/Service.js';

export const addService = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const service = await Service.create({ ...req.body, user: req.user.id });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getServices = async (req, res) => {
  const services = await Service.find().populate('user', 'name location');
  res.json(services);
};

export const getServiceByUser = async (req, res) => {
  const services = await Service.find({ user: req.params.userId });
  res.json(services);
};
