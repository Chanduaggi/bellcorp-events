import { useState, useEffect, useCallback } from 'react';
import { eventsAPI } from '../utils/api';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
      };
      
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedLocation) params.location = selectedLocation;

      const response = await eventsAPI.getEvents(params);
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, selectedCategory, selectedLocation]);

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const fetchCategories = async () => {
    try {
      const response = await eventsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await eventsAPI.getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to load locations');
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedLocation('');
    setCurrentPage(1);
  };

  return (
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Discover Events</h1>
          <p className="page-subtitle">
            Find and register for amazing events happening near you
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {(search || selectedCategory || selectedLocation) && (
              <button onClick={clearFilters} className="btn btn-secondary">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="spinner"></div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="events-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
