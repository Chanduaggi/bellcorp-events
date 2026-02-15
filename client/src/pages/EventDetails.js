import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, registrationsAPI } from '../utils/api';
import { toast } from 'react-toastify';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    if (user) {
      checkRegistration();
    }
  }, [id, user]);

  const fetchEventDetails = async () => {
    try {
      const response = await eventsAPI.getEventById(id);
      setEvent(response.data);
    } catch (error) {
      toast.error('Failed to load event details');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await registrationsAPI.checkRegistration(id);
      setIsRegistered(response.data.isRegistered);
    } catch (error) {
      console.error('Failed to check registration');
    }
  };

  const handleRegister = async () => {
    if (!user) {
      toast.info('Please login to register for events');
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      await registrationsAPI.register(id);
      toast.success('Successfully registered for event!');
      setIsRegistered(true);
      // Refresh event to update seat count
      fetchEventDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      try {
        await registrationsAPI.cancel(id);
        toast.success('Registration cancelled');
        setIsRegistered(false);
        fetchEventDetails();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel registration');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Event not found</h2>
      </div>
    );
  }

  const isUpcoming = new Date(event.date) >= new Date();
  const isSoldOut = event.availableSeats === 0;

  return (
    <div className="event-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Events
        </button>

        <div className="event-details-container">
          <div className="event-details-image">
            <img
              src={event.imageUrl}
              alt={event.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Event';
              }}
            />
          </div>

          <div className="event-details-content">
            <div className="event-category-badge">{event.category}</div>
            <h1 className="event-details-title">{event.name}</h1>

            <div className="event-info-grid">
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div className="info-content">
                  <div className="info-label">Date & Time</div>
                  <div className="info-value">{formatDate(event.date)}</div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <div className="info-label">Location</div>
                  <div className="info-value">{event.location}</div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">👤</span>
                <div className="info-content">
                  <div className="info-label">Organizer</div>
                  <div className="info-value">{event.organizer}</div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🎫</span>
                <div className="info-content">
                  <div className="info-label">Available Seats</div>
                  <div className={`info-value ${isSoldOut ? 'sold-out' : ''}`}>
                    {event.availableSeats} / {event.capacity}
                  </div>
                </div>
              </div>
            </div>

            <div className="event-description-section">
              <h2 className="section-title">About This Event</h2>
              <p className="event-description-text">{event.description}</p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="event-tags">
                {event.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="event-actions">
              {isRegistered ? (
                <div>
                  <div className="registered-badge">✓ You're registered for this event</div>
                  <button
                    onClick={handleCancelRegistration}
                    className="btn btn-danger"
                  >
                    Cancel Registration
                  </button>
                </div>
              ) : isSoldOut ? (
                <button className="btn btn-secondary" disabled>
                  Sold Out
                </button>
              ) : !isUpcoming ? (
                <button className="btn btn-secondary" disabled>
                  Event Has Passed
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="btn btn-primary btn-large"
                  disabled={registering}
                >
                  {registering ? 'Registering...' : 'Register for Event'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
