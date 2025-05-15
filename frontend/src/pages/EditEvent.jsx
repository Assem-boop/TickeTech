import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalTickets: "",
    ticketPricing: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/v1/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { title, description, date, location, totalTickets, ticketPricing } = res.data;

        setFormData({
          title,
          description,
          date: date.slice(0, 16),
          location,
          totalTickets,
          ticketPricing,
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load event.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "totalTickets" || name === "ticketPricing") && isNaN(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put(`/api/v1/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("✅ Event updated successfully!");
      setTimeout(() => navigate("/organizer-my-events"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={glassBox}>
          <p style={{ color: "white", textAlign: "center" }}>Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Edit Event</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          {["title", "description", "location", "date", "totalTickets", "ticketPricing"].map((field) => (
            <input
              key={field}
              type={field === "date" ? "datetime-local" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          ))}

          <button type="submit" style={buttonStyle}>
            Update Event
          </button>

          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎯 Styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  width: "100%",
  maxWidth: "500px",
  color: "white",
  boxShadow: "0 0 40px rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "2rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "1rem",
  fontSize: "1rem",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 0 10px #00bcd4",
};

const errorStyle = {
  color: "#ff4f4f",
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
};

const successStyle = {
  color: "#00e676",
  marginTop: "1rem",
  fontWeight: "bold",
  textAlign: "center",
};

export default EditEvent;
