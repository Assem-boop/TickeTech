import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("otpEmail");
    if (!savedEmail) {
      setError("No email found. Please restart the process.");
    } else {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/api/v1/forgot-password/verify-otp", {
        email,
        code: otp,
      });

      // ✅ Save code for next step
      localStorage.setItem("verifiedOtpCode", otp);

      setSuccess("✅ OTP verified successfully!");
      setTimeout(() => navigate("/reset-password"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Enter OTP</h2>
        <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          A 6-digit code was sent to <strong>{email || "your email"}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Verify OTP
          </button>
          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎨 Styles (unchanged — reuse your existing)

const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const glassBox = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "3rem 2.5rem",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  width: "90%",
  maxWidth: "420px",
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1.2rem",
  textAlign: "center",
  letterSpacing: "0.3em",
  border: "1px solid rgba(255,255,255,0.3)",
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "white",
  marginBottom: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#00bcd4",
  border: "none",
  color: "white",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 0 10px #00bcd4",
};

const errorStyle = {
  color: "#ff4f4f",
  marginTop: "1rem",
  textAlign: "center",
  fontWeight: "bold",
};

const successStyle = {
  color: "#00e676",
  marginTop: "1rem",
  textAlign: "center",
  fontWeight: "bold",
};

export default VerifyOtp;
