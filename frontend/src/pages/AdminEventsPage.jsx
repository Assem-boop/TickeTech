import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import EventRow from "../components/EventRow";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/v1/events/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(res.data);
    } catch (err) {
      setError("Failed to load events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/v1/events/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchEvents(); // refresh
    } catch (err) {
      setError("Could not update status.");
    }
  };

  const filteredEvents = events.filter((e) =>
    statusFilter === "All" ? true : e.status === statusFilter.toLowerCase()
  );

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Manage Events</h2>

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={selectStyle}
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Declined</option>
          </select>
        </div>

        {error && <p style={errorStyle}>{error}</p>}

        <div>
          {filteredEvents.map((event) => (
            <EventRow key={event._id} event={event} onUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
      </div>
    </div>
  );
};

const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
};

const glassBox = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "2rem",
  borderRadius: "20px",
  color: "white",
  maxWidth: "900px",
  width: "100%",
  boxShadow: "0 0 40px rgba(0,0,0,0.3)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "1.5rem",
};

const selectStyle = {
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "1rem",
  backgroundColor: "#fff",
  border: "none",
};

const errorStyle = {
  color: "#ff4f4f",
  marginBottom: "1rem",
  textAlign: "center",
  fontWeight: "bold",
};

export default AdminEventsPage;
