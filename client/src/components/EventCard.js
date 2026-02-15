import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
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

  const isUpcoming = new Date(event.date) >= new Date();
  const isSoldOut = event.availableSeats === 0;

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="event-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Event';
          }}
        />
        {isSoldOut && (
          <div className="event-badge sold-out">Sold Out</div>
        )}
        {!isSoldOut && !isUpcoming && (
          <div className="event-badge past">Past Event</div>
        )}
      </div>

      <div className="event-content">
        <div className="event-category">{event.category}</div>
        <h3 className="event-title">{event.name}</h3>
        
        <div className="event-details">
          <div className="event-detail-item">
            <span className="detail-icon">📅</span>
            <span className="detail-text">{formatDate(event.date)}</span>
          </div>
          <div className="event-detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{event.location}</span>
          </div>
          <div className="event-detail-item">
            <span className="detail-icon">👤</span>
            <span className="detail-text">{event.organizer}</span>
          </div>
        </div>

        <p className="event-description">
          {event.description.substring(0, 100)}...
        </p>

        <div className="event-footer">
          <div className="seats-info">
            <span className={`seats-count ${isSoldOut ? 'sold-out' : ''}`}>
              {event.availableSeats} / {event.capacity} seats
            </span>
          </div>
          <Link to={`/events/${event._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
