# Bellcorp Events - Event Management Application

A full-stack MERN application for discovering, browsing, and managing event registrations.

## 🚀 Features

### Authentication
- User registration with password hashing
- JWT-based authentication
- Protected routes for authenticated users

### Event Discovery
- Browse large collections of events efficiently
- Advanced search functionality
- Filter by category, location, and date
- Pagination for better performance
- Real-time seat availability tracking

### Event Management
- View detailed event information
- Register for events with seat validation
- Cancel event registrations
- Personal dashboard with upcoming and past events

## 🛠️ Tech Stack

**Frontend:**
- React.js (Functional Components & Hooks)
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- CSS3 for styling

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation

## 📁 Project Structure

```
bellcorp-events/
├── server/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── eventController.js # Event CRUD operations
│   │   └── registrationController.js # Registration management
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Event.js           # Event schema
│   │   └── Registration.js    # Registration schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── seedData.js            # Sample event data
│   ├── server.js              # Entry point
│   ├── .env.example           # Environment variables template
│   └── package.json
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── EventCard.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetails.js
│   │   │   └── Dashboard.js
│   │   ├── utils/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` file with your credentials:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

5. **Seed the database (optional but recommended):**
   ```bash
   npm run seed
   ```
   This will populate your database with 20 sample events.

6. **Start the server:**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

   Server will run on http://localhost:5000

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file (optional for production):**
   ```bash
   # Create .env in client folder
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   Application will run on http://localhost:3000

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Collection
```javascript
{
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  availableSeats: Number,
  category: String (enum),
  tags: [String],
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Registration Collection
```javascript
{
  user: ObjectId (ref: User),
  event: ObjectId (ref: Event),
  registrationDate: Date,
  status: String (enum: confirmed/cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Events
```
GET    /api/events                  - Get all events (with filters)
GET    /api/events/:id              - Get event by ID
GET    /api/events/meta/categories  - Get all categories
GET    /api/events/meta/locations   - Get all locations
POST   /api/events                  - Create event (Protected)
```

### Registrations
```
POST   /api/registrations/:eventId        - Register for event (Protected)
DELETE /api/registrations/:eventId        - Cancel registration (Protected)
GET    /api/registrations/my-events       - Get user's events (Protected)
GET    /api/registrations/check/:eventId  - Check if registered (Protected)
```

## 🚀 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
4. Add environment variables in Render dashboard
5. Deploy

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to client directory and deploy:
   ```bash
   cd client
   vercel
   ```

3. Update environment variables:
   - Add `REACT_APP_API_URL` with your deployed backend URL
   - Redeploy after updating

4. Alternative: Use Vercel dashboard to deploy from GitHub

## 🎥 Video Walkthrough Requirements

Your submission video should cover:

1. **Working Demo (3-5 minutes):**
   - User registration/login
   - Browsing events with search and filters
   - Event details page
   - Registration for an event
   - User dashboard showing registered events
   - Cancelling a registration

2. **Backend Code Walkthrough (5-7 minutes):**
   - Project structure
   - Database models and relationships
   - Authentication middleware
   - Key API endpoints (auth, events, registrations)
   - Registration logic with seat validation

3. **Frontend Code Walkthrough (5-7 minutes):**
   - Component structure
   - Routing setup
   - AuthContext for state management
   - Key pages (Events, EventDetails, Dashboard)
   - API integration

4. **Database Design (2-3 minutes):**
   - Explain User, Event, and Registration schemas
   - How they relate to each other
   - Compound index on Registration for preventing duplicates

## 🧪 Testing

### Testing with Postman

Import the following endpoints to test the API:

1. **Register User:** POST http://localhost:5000/api/auth/register
2. **Login:** POST http://localhost:5000/api/auth/login
3. **Get Events:** GET http://localhost:5000/api/events
4. **Register for Event:** POST http://localhost:5000/api/registrations/:eventId

## 💡 Key Features Implemented

✅ User authentication with JWT
✅ Password hashing with bcryptjs
✅ Protected routes (frontend & backend)
✅ Advanced search and filtering
✅ Pagination for large datasets
✅ Seat availability tracking
✅ Duplicate registration prevention
✅ Transaction-based registration (atomicity)
✅ Responsive design
✅ Real-time UI updates
✅ Error handling and validation

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB Atlas IP whitelist includes your IP
- Check connection string format
- Verify network connectivity

**CORS Errors:**
- Backend CORS is configured for all origins in development
- Update CORS settings for production deployment

**JWT Token Issues:**
- Clear localStorage and login again
- Verify JWT_SECRET matches in .env

## 📝 License

This project is created for the Bellcorp assignment.

## 👨‍💻 Author

Your Name - [Your Email]

## 📧 Submission

Send the following to **engineering@bellcorpstudio.com**:

1. Hosted Frontend URL (Vercel)
2. Hosted Backend URL (Render)
3. GitHub Repository Link
4. Video Walkthrough Link (Google Drive/YouTube)
