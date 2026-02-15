import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Events Near You
            </h1>
            <p className="hero-subtitle">
              From tech conferences to music festivals, find and register for events that match your interests.
            </p>
            <div className="hero-buttons">
              <Link to="/events" className="btn btn-primary btn-large">
                Browse Events
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Bellcorp Events?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Easy Discovery</h3>
              <p className="feature-description">
                Search and filter through thousands of events to find exactly what you're looking for.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Quick Registration</h3>
              <p className="feature-description">
                Register for events with just a few clicks and manage all your bookings in one place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Stay Updated</h3>
              <p className="feature-description">
                Keep track of your upcoming events and never miss out on exciting opportunities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Personalized</h3>
              <p className="feature-description">
                Get event recommendations based on your interests and past registrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of event-goers and start exploring today!
            </p>
            <Link to="/register" className="btn btn-primary btn-large">
              Create Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
