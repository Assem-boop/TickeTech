import React, { useState } from "react";
import api from "../api/axiosConfig";

const UpdateProfileForm = ({ currentData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: currentData?.name || "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false); // ✅ new state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true); // ✅ show loading state

    try {
      const payload = {
        name: formData.name,
        ...(formData.password ? { password: formData.password } : {}),
      };

      await api.put("/api/v1/users/profile", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("✅ Changes saved successfully!");
      setTimeout(() => {
        setSaving(false);
        if (onSuccess) onSuccess(); // ✅ hide form and refresh data
      }, 1200); // ✅ simulate a short save time
    } catch (err) {
      console.error("❌ PROFILE UPDATE FAILED:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Update failed.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
        required
        disabled={saving}
      />
      <input
        type="password"
        name="password"
        placeholder="New Password (optional)"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
        disabled={saving}
      />
      <button type="submit" style={buttonStyle} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}
    </form>
  );
};

// Styles
const formStyle = {
  marginTop: "2rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "1.2rem",
  fontSize: "1rem",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  outline: "none",
  boxSizing: "border-box",
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
  boxShadow: "0 0 15px #00bcd4",
  transition: "0.3s ease",
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

export default UpdateProfileForm;