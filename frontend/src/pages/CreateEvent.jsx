import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalTickets: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/v1/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Event created successfully!");
      setTimeout(() => navigate("/organizer-dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        {["title", "description", "location", "date", "totalTickets", "price"].map((field) => (
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
            }}
          />
        ))}

        <button type="submit" style={{ padding: "10px 20px" }}>
          Create Event
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default CreateEvent;
