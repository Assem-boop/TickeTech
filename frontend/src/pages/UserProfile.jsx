import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { name, email } = res.data;
        setFormData((prev) => ({ ...prev, name, email }));
      })
      .catch(() => {
        setError("Failed to load profile. Try re-logging.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

      setSuccess("✅ Profile updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={glassBox}>
        <h2 style={titleStyle}>My Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled
            style={{
              ...inputStyle,
              backgroundColor: "#2f2f2f",
              color: "#aaa",
              cursor: "not-allowed",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Update Profile
          </button>
          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎨 Centering container
const pageWrapper = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  overflow: "hidden",
};

// 🎨 Glass effect box
const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  width: "90%",
  maxWidth: "420px",
  color: "white",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

// 🎨 Headline
const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "2rem",
};

// 🎨 Inputs
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

// 🎨 Button
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

// 🎨 Error & success
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

export default UserProfile;
