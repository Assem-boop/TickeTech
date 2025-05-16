import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get(`/api/v1/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Event not found or not authorized."));
  }, [id]);

  const handleBooking = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await api.post(
        "/api/v1/bookings",
        { eventId: event._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ Booking confirmed!");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    }
  };

  if (!event) {
    return (
      <div style={pageStyle}>
        <p style={{ color: "white" }}>Loading event details...</p>
      </div>
    );
  }

  const available = event.remainingTickets;

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>{event.title}</h2>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.ticketPricing}</p>
        <p><strong>Available Tickets:</strong> {available > 0 ? available : "Sold Out"}</p>

        {user?.role === "Standard" && available > 0 && (
          <>
            <input
              type="number"
              value={quantity}
              min={1}
              max={available}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleBooking} style={buttonStyle}>
              Book Now (${event.ticketPricing * quantity})
            </button>
          </>
        )}

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  color: "white",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  maxWidth: "500px",
  width: "90%",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "1rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#00bcd4",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 0 10px #00bcd4",
};

const errorStyle = {
  color: "#ff4f4f",
  marginTop: "1rem",
  fontWeight: "bold",
};

const successStyle = {
  color: "#00e676",
  marginTop: "1rem",
  fontWeight: "bold",
};

export default EventDetails;