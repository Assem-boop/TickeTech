import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";

const OrganizerMyEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = () => {
    api
      .get("/api/v1/users/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setEvents(res.data))
      .catch(() => setError("Failed to load your events"));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (id) => navigate(`/edit-event/${id}`);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
      background: "#1e1e2f",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/v1/events/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: "#1e1e2f",
            color: "#fff",
          });
          fetchEvents();
        } catch (err) {
          console.error("❌ DELETE FAILED:", err);
          Swal.fire({
            icon: "error",
            title: "Failed to delete",
            text: "Something went wrong. Try again.",
            background: "#1e1e2f",
            color: "#fff",
          });
        }
      }
    });
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>🎤 My Events</h2>
        {error && <p style={errorStyle}>{error}</p>}

        {events.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>
            You haven’t created any events yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Tickets</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id}>
                    <td style={tdStyle}>{event.title}</td>
                    <td style={tdStyle}>
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{event.location}</td>
                    <td style={tdStyle}>{event.totalTickets}</td>
                    <td style={tdStyle}>${event.ticketPricing}</td>
                    <td style={tdStyle}>
                      <span style={badgeStyle(event.status)}>{event.status}</span>
                      {event.status === "declined" && (
                        <p style={declineNote}>❌ This event was declined</p>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={editBtn}
                        onClick={() => handleEdit(event._id)}
                      >
                        ✏️ Edit
                      </button>{" "}
                      <button
                        style={deleteBtn}
                        onClick={() => handleDelete(event._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Same styles as before...
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "2rem",
  width: "100%",
  maxWidth: "1100px",
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "1.5rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  backgroundColor: "#1e1e2f",
  color: "#fff",
  borderBottom: "1px solid #444",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #444",
  verticalAlign: "top",
};

const editBtn = {
  padding: "6px 12px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginRight: "8px",
  boxShadow: "0 0 10px rgba(255,193,7,0.4)",
};

const deleteBtn = {
  padding: "6px 12px",
  backgroundColor: "#e53935",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 10px rgba(229, 57, 53, 0.4)",
};

const badgeStyle = (status) => ({
  padding: "6px 10px",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "bold",
  textTransform: "capitalize",
  backgroundColor:
    status === "approved"
      ? "#4caf50"
      : status === "pending"
      ? "#ffa726"
      : "#e53935",
  color: "white",
  display: "inline-block",
  marginBottom: "0.25rem",
  boxShadow: "0 0 8px rgba(0,0,0,0.3)",
});

const declineNote = {
  fontSize: "0.75rem",
  color: "#e57373",
  fontStyle: "italic",
  marginTop: "0.2rem",
};

const errorStyle = {
  color: "#ff4f4f",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "1rem",
};

export default OrganizerMyEvents;
