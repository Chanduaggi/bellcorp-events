import { useState, useEffect } from 'react';
import { registrationsAPI } from '../utils/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const response = await registrationsAPI.getMyEvents();
      setUpcomingEvents(response.data.upcoming);
      setPastEvents(response.data.past);
    } catch (error) {
      toast.error('Failed to load your events');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      try {
        await registrationsAPI.cancel(eventId);
        toast.success('Registration cancelled');
        fetchMyEvents(); // Refresh the list
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel registration');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const EventList = ({ events, isPast }) => (
    <div className="event-list">
      {events.map((registration) => (
        <div key={registration._id} className="dashboard-event-card">
          <div className="event-card-image">
            <img
              src={registration.event.imageUrl}
              alt={registration.event.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x150?text=Event';
              }}
            />
          </div>
          <div className="event-card-content">
            <div className="event-card-header">
              <div>
                <span className="event-category-small">
                  {registration.event.category}
                </span>
                <h3 className="event-card-title">{registration.event.name}</h3>
              </div>
            </div>

            <div className="event-card-details">
              <div className="detail-row">
                <span className="detail-icon">📅</span>
                <span>{formatDate(registration.event.date)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">📍</span>
                <span>{registration.event.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">👤</span>
                <span>{registration.event.organizer}</span>
              </div>
            </div>

            <div className="event-card-actions">
              <Link
                to={`/events/${registration.event._id}`}
                className="btn btn-secondary btn-small"
              >
                View Details
              </Link>
              {!isPast && (
                <button
                  onClick={() => handleCancelRegistration(registration.event._id)}
                  className="btn btn-danger btn-small"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="page-title">My Events</h1>
          <p className="page-subtitle">Manage your event registrations</p>
        </div>

        {upcomingEvents.length === 0 && pastEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h2>No Events Yet</h2>
            <p>You haven't registered for any events. Start exploring!</p>
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            <section className="events-section">
              <div className="section-header">
                <h2 className="section-title">
                  Upcoming Events ({upcomingEvents.length})
                </h2>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="no-events-message">
                  <p>No upcoming events. Check out new events to register!</p>
                  <Link to="/events" className="btn btn-secondary">
                    Browse Events
                  </Link>
                </div>
              ) : (
                <EventList events={upcomingEvents} isPast={false} />
              )}
            </section>

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <section className="events-section">
                <div className="section-header">
                  <h2 className="section-title">
                    Past Events ({pastEvents.length})
                  </h2>
                </div>
                <EventList events={pastEvents} isPast={true} />
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
