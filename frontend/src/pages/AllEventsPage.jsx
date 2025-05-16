// src/pages/AllEventsPage.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import EventCard from "../components/EventCard";

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/v1/events");
      setEvents(res.data.data || []);
      setFiltered(res.data.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      events.filter(
        (e) =>
          e.title.toLowerCase().includes(lower) ||
          e.location.toLowerCase().includes(lower)
      )
    );
  }, [search, events]);

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>All Approved Events</h2>
      <input
        type="text"
        placeholder="Search by title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      <div style={gridStyle}>
        {filtered.length === 0 ? (
          <p style={{ color: "white" }}>No events match your search.</p>
        ) : (
          filtered.map((event) => <EventCard key={event._id} event={event} />)
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh",
  padding: "2rem",
  background: "linear-gradient(to right, #141e30, #243b55)",
  color: "white",
};

const titleStyle = {
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: "2rem",
};

const inputStyle = {
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto 2rem auto",
  display: "block",
  padding: "12px 16px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  outline: "none",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
};

export default AllEventsPage;
