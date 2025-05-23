import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
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

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Automatically focus the next input box
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otpCode = otp.join("");

    try {
      await api.post("/api/v1/forgot-password/verify-otp", {
        email,
        code: otpCode,
      });

      // ✅ Save code for next step
      localStorage.setItem("verifiedOtpCode", otpCode);

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
          <div style={otpContainerStyle}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                style={otpInputStyle}
                required
              />
            ))}
          </div>
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

// 🎨 Styles updated for separate OTP boxes

const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)", // Match SendOtp.jsx
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};

const glassBox = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "3rem",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
  width: "100%",
  maxWidth: "480px", // Match SendOtp.jsx
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "1rem",
  fontWeight: "600",
};

const otpContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1.5rem",
};

const otpInputStyle = {
  width: "50px",
  height: "50px",
  fontSize: "1.5rem",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.3)",
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "white",
  outline: "none",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px", // Match SendOtp.jsx
  cursor: "pointer",
  transition: "all 0.3s ease",
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