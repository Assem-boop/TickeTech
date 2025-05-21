// src/pages/BookingDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

const BookingDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/api/v1/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooking(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load booking details."
        );
      }
    };

    fetchBooking();
  }, [id, token]);

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading booking details...</p>
      </div>
    );
  }

  const event = booking.event || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎟️ Booking Details</h2>
        <div style={styles.infoGroup}>
          <p><strong>Event:</strong> {event.title || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Quantity:</strong> {booking.quantity}</p>
          <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
          <p><strong>Status:</strong> <span style={styles.status(booking.status)}>{booking.status}</span></p>
          <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "2.5rem",
    maxWidth: "500px",
    width: "100%",
    color: "white",
    boxShadow: "0 0 30px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#00e676",
  },
  infoGroup: {
    lineHeight: "1.7rem",
  },
  error: {
    color: "#ff4f4f",
    fontWeight: "bold",
    textAlign: "center",
  },
  loading: {
    color: "white",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  status: (status) => ({
    color:
      status === "confirmed"
        ? "#00e676"
        : status === "canceled"
        ? "#ff4f4f"
        : "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  }),
};

export default BookingDetails;