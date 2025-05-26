import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import BookTicketForm from "../components/BookTicketForm";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/v1/events/${id}`);
        console.log("🎯 Event fetched:", res.data);
        setEvent(res.data);
      } catch (err) {
        console.error("❌ Error loading event:", err);
        setError("Failed to load event.");
      }
    };

    fetchEvent();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>{event.title}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Price:</strong> ${event.ticketPricing}</p>
        <p><strong>Tickets Available:</strong> {event.remainingTickets}</p>

        <hr style={{ margin: "2rem 0", opacity: 0.3 }} />

        <BookTicketForm event={event} />
      </div>
    </div>
  );
};

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "2.5rem",
  color: "white",
  width: "90%",
  maxWidth: "600px",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle = {
  fontSize: "2rem",
  marginBottom: "1rem",
};

export default EventDetails;