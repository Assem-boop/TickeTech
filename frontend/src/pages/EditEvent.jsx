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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true); // ✅ controls initial form rendering

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/v1/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { title, description, date, location, totalTickets, ticketPricing } = res.data;

        setFormData({
          title,
          description,
          date: date.slice(0, 16), // ✅ prevents timezone shift and keeps format
          location,
          totalTickets,
          ticketPricing,
        });

        setLoading(false); // ✅ show form only when data is ready
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event. Please try again later.");
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("✅ Event updated successfully!");
      setTimeout(() => navigate("/organizer-dashboard"), 1500);
    } catch (err) {
      console.error("❌ Update error:", err.response?.data || err);
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading event...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        {["title", "description", "location", "date", "totalTickets", "ticketPricing"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "datetime-local" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            style={{
              display: "block",
              marginBottom: "1rem",
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        ))}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Event
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default EditEvent;
