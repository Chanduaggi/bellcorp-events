import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Event from './models/Event.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const events = [
  {
    name: 'React Summit 2026',
    organizer: 'Tech Events Inc',
    location: 'San Francisco, CA',
    date: new Date('2026-03-15T09:00:00'),
    description:
      'Join us for the biggest React conference of the year! Learn from industry experts about the latest trends in React development, including React 19, Server Components, and advanced optimization techniques.',
    capacity: 500,
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Web Development'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    name: 'Startup Pitch Night',
    organizer: 'Venture Capital Forum',
    location: 'New York, NY',
    date: new Date('2026-02-28T18:00:00'),
    description:
      'Watch innovative startups pitch their ideas to top venture capitalists. Network with entrepreneurs, investors, and industry leaders in this exciting evening event.',
    capacity: 200,
    category: 'Business',
    tags: ['Startups', 'Venture Capital', 'Networking'],
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
  },
  {
    name: 'Digital Art Exhibition',
    organizer: 'Modern Art Gallery',
    location: 'Los Angeles, CA',
    date: new Date('2026-04-10T10:00:00'),
    description:
      'Experience the future of art with our cutting-edge digital art exhibition. Featuring NFT artists, interactive installations, and immersive digital experiences.',
    capacity: 300,
    category: 'Arts & Culture',
    tags: ['Digital Art', 'NFT', 'Exhibition'],
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
  },
  {
    name: 'Marathon 2026',
    organizer: 'City Sports Committee',
    location: 'Chicago, IL',
    date: new Date('2026-05-20T06:00:00'),
    description:
      'Run through the streets of Chicago in this annual marathon event. Open to all fitness levels with 5K, 10K, and full marathon options available.',
    capacity: 10000,
    category: 'Sports',
    tags: ['Marathon', 'Running', 'Fitness'],
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
  },
  {
    name: 'AI & Machine Learning Workshop',
    organizer: 'Data Science Academy',
    location: 'Boston, MA',
    date: new Date('2026-03-25T09:00:00'),
    description:
      'Hands-on workshop covering the fundamentals of AI and machine learning. Learn to build and deploy ML models using Python, TensorFlow, and scikit-learn.',
    capacity: 80,
    category: 'Education',
    tags: ['AI', 'Machine Learning', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
  },
  {
    name: 'Wellness & Yoga Retreat',
    organizer: 'Mindful Living Center',
    location: 'Sedona, AZ',
    date: new Date('2026-06-15T08:00:00'),
    description:
      'Rejuvenate your mind and body in this 3-day wellness retreat. Includes daily yoga sessions, meditation workshops, healthy cuisine, and mindfulness training.',
    capacity: 50,
    category: 'Health & Wellness',
    tags: ['Yoga', 'Meditation', 'Wellness'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
  },
  {
    name: 'Comedy Night Live',
    organizer: 'Laugh Factory',
    location: 'Austin, TX',
    date: new Date('2026-03-05T20:00:00'),
    description:
      'An evening of stand-up comedy featuring top comedians from across the country. Enjoy laughs, drinks, and great company in an intimate comedy club setting.',
    capacity: 150,
    category: 'Entertainment',
    tags: ['Comedy', 'Stand-up', 'Live Show'],
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400',
  },
  {
    name: 'Jazz Festival 2026',
    organizer: 'Music Lovers Association',
    location: 'New Orleans, LA',
    date: new Date('2026-04-18T15:00:00'),
    description:
      'Celebrate the rich heritage of jazz music with performances from legendary and emerging artists.',
    capacity: 5000,
    category: 'Music',
    tags: ['Jazz', 'Festival', 'Live Music'],
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
  },
  {
    name: 'Wine Tasting Experience',
    organizer: 'Vineyard Tours Co',
    location: 'Napa Valley, CA',
    date: new Date('2026-05-08T14:00:00'),
    description:
      'Explore premium wines from local vineyards in this exclusive tasting event.',
    capacity: 100,
    category: 'Food & Drink',
    tags: ['Wine', 'Tasting', 'Gourmet'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
  },
  {
    name: 'Tech Founders Meetup',
    organizer: 'Startup Community Hub',
    location: 'Seattle, WA',
    date: new Date('2026-02-22T17:00:00'),
    description:
      'Network with fellow tech entrepreneurs and startup founders.',
    capacity: 120,
    category: 'Networking',
    tags: ['Networking', 'Startups', 'Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
  },
  {
    name: 'Blockchain Summit',
    organizer: 'Crypto Innovation Group',
    location: 'Miami, FL',
    date: new Date('2026-04-05T09:00:00'),
    description:
      'Dive deep into blockchain technology and cryptocurrency.',
    capacity: 400,
    category: 'Technology',
    tags: ['Blockchain', 'Cryptocurrency', 'Web3'],
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
  },
  {
    name: 'Product Design Workshop',
    organizer: 'UX Design Institute',
    location: 'Denver, CO',
    date: new Date('2026-03-18T10:00:00'),
    description:
      'Learn user-centered design principles and prototyping techniques.',
    capacity: 60,
    category: 'Education',
    tags: ['UX Design', 'Product Design', 'Workshop'],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  },
  {
    name: 'Business Leadership Conference',
    organizer: 'Executive Forum',
    location: 'Washington, DC',
    date: new Date('2026-05-12T08:00:00'),
    description:
      'Two-day conference for business leaders and executives.',
    capacity: 250,
    category: 'Business',
    tags: ['Leadership', 'Management', 'Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=400',
  },
  {
    name: 'Film Screening & Discussion',
    organizer: 'Independent Cinema Society',
    location: 'Portland, OR',
    date: new Date('2026-02-25T19:00:00'),
    description:
      'Exclusive screening of award-winning independent films.',
    capacity: 180,
    category: 'Arts & Culture',
    tags: ['Film', 'Cinema', 'Independent'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
  },
  {
    name: 'Food Truck Festival',
    organizer: 'Culinary Events LLC',
    location: 'San Diego, CA',
    date: new Date('2026-04-22T11:00:00'),
    description:
      'Taste cuisines from around the world at this massive food truck gathering.',
    capacity: 3000,
    category: 'Food & Drink',
    tags: ['Food', 'Festival', 'Street Food'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
  },
  {
    name: 'Rock Concert Series',
    organizer: 'Live Nation',
    location: 'Nashville, TN',
    date: new Date('2026-06-01T19:00:00'),
    description:
      'Epic rock concert featuring multiple bands across different genres.',
    capacity: 8000,
    category: 'Music',
    tags: ['Rock', 'Concert', 'Live Performance'],
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
  },
  {
    name: 'Mental Health Awareness Seminar',
    organizer: 'Wellness Foundation',
    location: 'Philadelphia, PA',
    date: new Date('2026-03-08T13:00:00'),
    description:
      'Important discussion on mental health awareness.',
    capacity: 200,
    category: 'Health & Wellness',
    tags: ['Mental Health', 'Wellness', 'Awareness'],
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
  },
  {
    name: 'Basketball Championship',
    organizer: 'State Athletic Association',
    location: 'Phoenix, AZ',
    date: new Date('2026-05-28T18:00:00'),
    description:
      'Watch top college basketball teams compete for the championship.',
    capacity: 15000,
    category: 'Sports',
    tags: ['Basketball', 'Championship', 'Tournament'],
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
  },
  {
    name: 'Photography Exhibition',
    organizer: 'Visual Arts Center',
    location: 'Minneapolis, MN',
    date: new Date('2026-04-12T11:00:00'),
    description:
      'Showcase of contemporary photography.',
    capacity: 150,
    category: 'Arts & Culture',
    tags: ['Photography', 'Exhibition', 'Art'],
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
  },
  {
    name: 'Cybersecurity Conference',
    organizer: 'InfoSec Global',
    location: 'Atlanta, GA',
    date: new Date('2026-05-16T09:00:00'),
    description:
      'Stay ahead of cyber threats with insights from security experts.',
    capacity: 350,
    category: 'Technology',
    tags: ['Cybersecurity', 'InfoSec', 'Technology'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing events
    await Event.deleteMany();
    console.log('Existing events cleared');

    // Add availableSeats automatically
    const eventsWithSeats = events.map(event => ({
      ...event,
      availableSeats: event.capacity,
    }));

    // Insert new events
    await Event.insertMany(eventsWithSeats);

    console.log('20 events added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
