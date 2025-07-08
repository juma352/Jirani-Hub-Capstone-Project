import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
     if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const event = await Event.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate('createdBy', 'name');
  res.json(events);
};

export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }
    res.json({ message: 'RSVP recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
