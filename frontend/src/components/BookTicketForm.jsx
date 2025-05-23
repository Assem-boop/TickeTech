import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

const BookTicketForm = ({ event }) => {
  const [quantity, setQuantity] = useState("1");
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    console.log("🎯 Event passed to BookTicketForm:", event);
  }, [event]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingMessage("");

    const numberOfTickets = parseInt(quantity);
    const ticketPricing = Number(event?.ticketPricing);
    const totalPrice = Number((numberOfTickets * ticketPricing).toFixed(2));

    const payload = {
      eventId: event?._id,
      numberOfTickets,
      totalPrice,
    };

    console.log("📦 Final booking payload:", payload);

    // ✅ Sanity check
    if (!payload.eventId || !numberOfTickets || isNaN(totalPrice)) {
      console.error("⚠️ Invalid payload:", payload);
      setBookingMessage("⚠️ Booking failed: Please enter a valid number of tickets.");
      return;
    }

    try {
      const res = await api.post("/api/v1/bookings", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("✅ Booking success:", res.data);
      setBookingMessage("✅ Booking confirmed!");
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err.message);
      setBookingMessage(
        "❌ Booking failed: " + (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <form onSubmit={handleBooking} style={formStyle}>
      <label style={labelStyle}>Number of Tickets:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Book Now (${(parseInt(quantity || "0") * event.ticketPricing).toFixed(2)})
      </button>

      {bookingMessage && <p style={messageStyle}>{bookingMessage}</p>}
    </form>
  );
};

// Styles
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "300px",
};

const labelStyle = { fontWeight: "bold" };

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 10px #00bcd4",
};

const messageStyle = {
  textAlign: "center",
  fontWeight: "bold",
};

export default BookTicketForm;
