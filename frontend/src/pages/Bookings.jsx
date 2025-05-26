import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/v1/users/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load your bookings.");
    }
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await api.delete(`/api/v1/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Could not cancel booking.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>My Bookings</h2>
        {error && <p style={errorStyle}>{error}</p>}

        {bookings.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>No bookings yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Event</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Tickets</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td style={tdStyle}>{booking.event?.title}</td>
                    <td style={tdStyle}>
                      {new Date(booking.event?.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{booking.event?.location}</td>
                    <td style={tdStyle}>{booking.quantity}</td>
                    <td style={tdStyle}>${booking.totalPrice}</td>
                    <td style={tdStyle}>{booking.status || "Confirmed"}</td>
                    <td style={tdStyle}>
                      <button style={cancelBtn} onClick={() => handleCancel(booking._id)}>
                        Cancel
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

// Styles
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
  maxWidth: "1000px",
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
};

const cancelBtn = {
  padding: "6px 10px",
  backgroundColor: "#e53935",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "#ff4f4f",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "1rem",
};

export default Bookings;