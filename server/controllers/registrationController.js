import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

// @desc    Register for an event
// @route   POST /api/registrations/:eventId
// @access  Private
export const registerForEvent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    // Check if event exists
    const event = await Event.findById(eventId).session(session);

    if (!event) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if seats are available
    if (event.availableSeats <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Event is sold out' });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId,
      status: 'confirmed',
    }).session(session);

    if (existingRegistration) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: 'You are already registered for this event' });
    }

    // Create registration
    const registration = await Registration.create(
      [
        {
          user: userId,
          event: eventId,
        },
      ],
      { session }
    );

    // Decrease available seats
    event.availableSeats -= 1;
    await event.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Populate event and user details
    await registration[0].populate('event');
    await registration[0].populate('user', 'name email');

    res.status(201).json({
      message: 'Successfully registered for event',
      registration: registration[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Cancel event registration
// @route   DELETE /api/registrations/:eventId
// @access  Private
export const cancelRegistration = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    // Find registration
    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
      status: 'confirmed',
    }).session(session);

    if (!registration) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: 'Registration not found or already cancelled' });
    }

    // Update registration status
    registration.status = 'cancelled';
    await registration.save({ session });

    // Increase available seats
    const event = await Event.findById(eventId).session(session);
    event.availableSeats += 1;
    await event.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user's registrations
// @route   GET /api/registrations/my-events
// @access  Private
export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({
      user: userId,
      status: 'confirmed',
    })
      .populate('event')
      .sort({ registrationDate: -1 });

    // Separate upcoming and past events
    const now = new Date();
    const upcomingEvents = [];
    const pastEvents = [];

    registrations.forEach((reg) => {
      if (reg.event.date >= now) {
        upcomingEvents.push(reg);
      } else {
        pastEvents.push(reg);
      }
    });

    res.json({
      upcoming: upcomingEvents,
      past: pastEvents,
      total: registrations.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Check if user is registered for an event
// @route   GET /api/registrations/check/:eventId
// @access  Private
export const checkRegistration = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const registration = await Registration.findOne({
      user: userId,
      event: eventId,
      status: 'confirmed',
    });

    res.json({ isRegistered: !!registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
