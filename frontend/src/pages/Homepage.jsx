import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"; // ✅ using configured axios

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
        setEvents([]); // fallback to avoid map crash
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upcoming Events</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "10px",
              width: "300px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> ${event.ticketPricing}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
