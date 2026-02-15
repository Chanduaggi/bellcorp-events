import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an event name'],
      trim: true,
    },
    organizer: {
      type: String,
      required: [true, 'Please add organizer name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add event date'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please add capacity'],
      min: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
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
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/400x300',
    },
  },
  {
    timestamps: true,
  }
);

// Set availableSeats equal to capacity before saving
eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.availableSeats = this.capacity;
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
