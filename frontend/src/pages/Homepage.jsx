import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const Homepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/events")
      .then((res) => {
        const eventsArray = Array.isArray(res.data)
          ? res.data
          : res.data.data;
        setEvents(eventsArray || []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, []);

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Upcoming Events</h1>
      <div style={gridStyle}>
        {events.map((event) => (
          <div key={event._id} style={cardStyle}>
            <h2 style={cardTitle}>{event.title}</h2>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> ${event.ticketPricing}</p>
          </div>
        ))}
        {events.length === 0 && (
          <p style={{ textAlign: "center", width: "100%", color: "#ccc" }}>
            No events available at the moment.
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

export default Homepage;
