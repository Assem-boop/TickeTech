import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/v1/events/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, status) => {
    try {
      await api.put(`/api/v1/events/${eventId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const filteredEvents =
    filter === "all" ? events : events.filter((event) => event.status === filter);

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Admin: All Events</h2>

        <div style={filterWrapper}>
          {["all", "approved", "pending", "declined"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                ...filterButton,
                backgroundColor: filter === status ? "#00bcd4" : "transparent",
                color: filter === status ? "white" : "#00bcd4",
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>No events found.</p>
        ) : (
          <div>
            {filteredEvents.map((event) => (
              <div key={event._id} style={card}>
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Status:</strong> <span style={{ color: "#ffc107" }}>{event.status}</span></p>

                {event.status === "pending" && (
                  <div style={{ marginTop: "0.8rem", display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => handleStatusChange(event._id, "approved")}
                      style={approveButton}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(event._id, "declined")}
                      style={declineButton}
                    >
                      ❌ Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 🧠 Styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  padding: "3rem 2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  overflowY: "auto",
};

const glassBox = {
  background: "rgba(255,255,255,0.06)",
  padding: "3rem",
  width: "100%",
  maxWidth: "900px",
  borderRadius: "20px",
  color: "white",
  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "1.5rem",
};

const filterWrapper = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "2rem",
};

const filterButton = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "1px solid #00bcd4",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
  background: "none",
};

const card = {
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "1.5rem",
  borderRadius: "12px",
  marginBottom: "1rem",
  backgroundColor: "rgba(255,255,255,0.04)",
};

const approveButton = {
  padding: "10px 16px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const declineButton = {
  padding: "10px 16px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminEventsPage;
