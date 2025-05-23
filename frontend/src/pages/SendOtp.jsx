import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const SendOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/api/v1/forgot-password/send-otp", { email });
      localStorage.setItem("otpEmail", email);
      setSuccess("✅ OTP sent to your email.");
      setTimeout(() => navigate("/verify-otp"), 1500);
    } catch (err) {
      console.error("Send OTP Error:", err);
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Forgot Password</h2>
        <p style={descStyle}>Enter your registered email to receive an OTP.</p>
        <form onSubmit={handleSendOtp} style={formStyle}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Send OTP
          </button>
          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

// ✅ Matching login UI 1:1
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  width: "100%",
  maxWidth: "480px", // ✅ match login width
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "1rem",
  textAlign: "center",
};

const descStyle = {
  marginBottom: "2rem",
  textAlign: "center",
  fontSize: "1rem",
  color: "#ccc",
};

const formStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "8px", // Match Login.jsx
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  outline: "none",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box", // Match Login.jsx
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px", // Match Login.jsx
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 0 10px #00bcd4", // Match Login.jsx
};

const errorStyle = {
  color: "#ff4f4f",
  fontWeight: "bold",
  textAlign: "center",
};

const successStyle = {
  color: "#00e676",
  fontWeight: "bold",
  textAlign: "center",
};

export default SendOtp;