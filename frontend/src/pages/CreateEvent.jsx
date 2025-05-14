import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"; 

const CreateEvent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
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

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "totalTickets" || name === "ticketPricing") && isNaN(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user || (!user.id && !user._id)) {
      setError("Organizer info missing. Please log in again.");
      return;
    }

    const total = Number(formData.totalTickets);
    const pricing = Number(formData.ticketPricing);

    const finalPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      date: formData.date,
      location: formData.location.trim(),
      totalTickets: total,
      ticketPricing: pricing,
      remainingTickets: total,
      organizer: user.id || user._id,
    };

    console.log("🚀 Sending payload:", JSON.stringify(finalPayload, null, 2));

    try {
      await api.post("/api/v1/events", finalPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ Explicit header
        },
      });

      setSuccess("✅ Event created successfully!");
      setTimeout(() => navigate("/organizer-dashboard"), 1500);
    } catch (err) {
      console.error("❌ Submission error:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Create New Event</h2>
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
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Create Event
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
