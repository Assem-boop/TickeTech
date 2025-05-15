import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/v1/users/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>My Bookings</h2>
        {loading ? (
          <p style={infoText}>Loading...</p>
        ) : error ? (
          <p style={errorStyle}>{error}</p>
        ) : bookings.length === 0 ? (
          <p style={infoText}>No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} style={cardStyle}>
              <h3 style={eventTitle}>{b.event?.title || "Untitled Event"}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(b.event?.date).toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Location:</strong> {b.event?.location}
              </p>
              <p>
                <strong>Quantity:</strong> {b.quantity}
              </p>
              <p>
                <strong>Total:</strong> ${b.totalPrice}
              </p>
              <button onClick={() => handleCancel(b._id)} style={cancelButton}>
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ✨ Cinematic Styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  width: "100%",
  maxWidth: "700px",
  padding: "2rem",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "white",
};

const titleStyle = {
  fontSize: "1.8rem",
  marginBottom: "1.5rem",
  textAlign: "center",
};

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  padding: "1.5rem",
  borderRadius: "10px",
  marginBottom: "1rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const eventTitle = {
  fontSize: "1.3rem",
  marginBottom: "0.5rem",
};

const cancelButton = {
  marginTop: "1rem",
  backgroundColor: "#ff5252",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 10px #ff5252",
};

const infoText = {
  textAlign: "center",
  fontStyle: "italic",
};

const errorStyle = {
  color: "#ff4f4f",
  fontWeight: "bold",
  textAlign: "center",
};

export default MyBookings;
