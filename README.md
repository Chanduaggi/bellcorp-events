Bellcorp Events - Event Management Application

A full-stack MERN application for discovering and managing event registrations.

🚀 Tech Stack

Frontend: React.js, React Router, Axios
Backend: Node.js, Express.js, MongoDB
Authentication: JWT, bcryptjs

✨ Features

User authentication (register/login)
Browse events with search and filters
Event registration with seat tracking
User dashboard (upcoming & past events)
Cancel registrations
Responsive design

📦 Installation

Backend Setup
bashcd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run seed
npm start

Frontend Setup
bashcd client
npm install
npm start