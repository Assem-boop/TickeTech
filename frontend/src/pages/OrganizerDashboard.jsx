import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const eventsRes = await axios.get("/api/v1/users/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const analyticsRes = await axios.get("/api/v1/users/events/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(eventsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error("Error fetching organizer data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (err) {
      alert("Failed to delete event.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading organizer data...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Organizer Dashboard</h1>
        <button
          onClick={() => navigate("/create-event")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Create Event
        </button>
      </div>

      <p>Welcome, Organizer! Here's an overview of your events:</p>

      <h2 style={{ marginTop: "2rem" }}>Your Events</h2>
      {events.length === 0 ? (
        <p>No events posted yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <strong>{event.title}</strong> <br />
              Date: {event.date ? new Date(event.date).toLocaleDateString() : "N/A"} <br />
              Location: {event.location || "N/A"} <br />
              Tickets: {event.totalTickets || 0} <br />
              Status: {event.status || "Pending"} <br />

              <button
                onClick={() => navigate(`/edit-event/${event._id}`)}
                style={{
                  marginRight: "1rem",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 style={{ marginTop: "2rem" }}>Event Analytics</h2>
      {analytics && analytics.length > 0 && analytics.some((a) => a.bookedPercentage > 0) ? (
        <div
          style={{
            height: "300px",
            marginTop: "1rem",
            backgroundColor: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="eventTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookedPercentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No analytics available yet.</p>
      )}
    </div>
  );
};

export default OrganizerDashboard;
