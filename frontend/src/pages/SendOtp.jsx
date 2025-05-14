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

      // ✅ Store for later steps
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
        <p style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Enter your registered email to receive an OTP.
        </p>
        <form onSubmit={handleSendOtp}>
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

// 🎨 Reuse styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  width: "90%",
  maxWidth: "420px",
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.7rem",
  fontWeight: "600",
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  marginBottom: "1rem",
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
  transition: "all 0.3s ease",
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

export default SendOtp;
