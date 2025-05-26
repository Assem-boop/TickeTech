import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    api
      .get("/api/v1/events")
      .then((res) => {
        const eventsArray = Array.isArray(res.data)
          ? res.data
          : res.data.data;
        setEvents(eventsArray || []);
        setFilteredEvents(eventsArray || []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
        setFilteredEvents([]);
      });
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(lowerSearch) &&
      (locationFilter === "" || event.location.toLowerCase() === locationFilter.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [search, locationFilter, events]);

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Upcoming Events</h1>

      <div style={filterContainer}>
        <input
          type="text"
          placeholder="Search by event title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={searchInput}
        />
      </div>

      <div style={gridStyle}>
        {filteredEvents.map((event) => (
          <Link to={`/events/${event._id}`} key={event._id} style={linkStyle}>
            <div style={cardStyle}>
              <h2 style={cardTitle}>{event.title}</h2>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> ${event.ticketPricing}</p>
            </div>
          </Link>
        ))}

        {filteredEvents.length === 0 && (
          <p style={{ textAlign: "center", width: "100%", color: "#ccc" }}>
            No events match your search.
          </p>
        )}
      </div>
    </div>
  );
};

// 💅 Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  padding: "3rem 2rem",
  color: "white",
};

const headingStyle = {
  textAlign: "center",
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "2rem",
  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
};

const filterContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "2rem",
  flexWrap: "wrap",
};

const searchInput = {
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "1rem",
  width: "250px",
  outline: "none",
};

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  justifyContent: "center",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.07)",
  backdropFilter: "blur(6px)",
  borderRadius: "15px",
  padding: "1.5rem",
  width: "300px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  transition: "transform 0.3s ease",
  border: "1px solid rgba(255,255,255,0.15)",
};

const cardTitle = {
  fontSize: "1.4rem",
  fontWeight: "600",
  marginBottom: "1rem",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export default Homepage;