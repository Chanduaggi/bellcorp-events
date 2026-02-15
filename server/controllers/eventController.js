import Event from '../models/Event.js';

// @desc    Get all events with search and filters
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { search, category, location, startDate, endDate, page = 1, limit = 12 } = req.query;

    // Build query object
    let query = {};

    // Text search (searches in name, organizer, and description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const total = await Event.countDocuments(query);

    // Fetch events
    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limitNum)
      .skip(skip);

    res.json({
      events,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalEvents: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new event (optional - for admin)
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get event categories
// @route   GET /api/events/meta/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = [
      'Technology',
      'Business',
      'Arts & Culture',
      'Sports',
      'Education',
      'Health & Wellness',
      'Entertainment',
      'Music',
      'Food & Drink',
      'Networking',
    ];
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get unique locations
// @route   GET /api/events/meta/locations
// @access  Public
export const getLocations = async (req, res) => {
  try {
    const locations = await Event.distinct('location');
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
