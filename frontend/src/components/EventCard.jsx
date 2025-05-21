
// src/components/EventCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/events/${event._id}`)}
      style={cardStyle}
    >
      <h3>{event.title}</h3>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString("en-GB")}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Price:</strong> ${event.ticketPricing}
      </p>
    </div>
  );
};

// 🎨 Styles
const cardStyle = {
  padding: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  color: "white",
};

export default EventCard;
