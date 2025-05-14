import React, { useState, useEffect } from "react";
import axios from "axios";
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
    price: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/v1/events/${id}`);
        const { title, description, date, location, totalTickets, price } = res.data;

        let formattedDate = "";
        if (date) {
          const parsed = new Date(date);
          if (!isNaN(parsed)) {
            formattedDate = parsed.toISOString().slice(0, 16);
          }
        }

        setFormData({
          title: title || "",
          description: description || "",
          date: formattedDate,
          location: location || "",
          totalTickets: totalTickets || "",
          price: price || "",
        });
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event. Please try again later.");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "totalTickets" || name === "price") && isNaN(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.put(`/api/v1/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("✅ Event updated successfully!");
      setTimeout(() => navigate("/organizer-dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Edit Event</h2>
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
