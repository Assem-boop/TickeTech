import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("otpEmail");
    const storedCode = localStorage.getItem("verifiedOtpCode");

    if (!storedEmail || !storedCode) {
      setError("Verification incomplete. Please restart the process.");
    } else {
      setEmail(storedEmail);
      setCode(storedCode);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.put("/api/v1/forgot-password/reset-password", {
        email,
        code,
        newPassword: password,
      });

      setSuccess("✅ Password reset! Redirecting...");
      localStorage.removeItem("otpEmail");
      localStorage.removeItem("verifiedOtpCode");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Set New Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Reset Password
          </button>
          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎨 Updated styles to match SendOtp.jsx

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
  marginBottom: "1.5rem",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "1px solid rgba(255,255,255,0.3)",
  backgroundColor: "rgba(255,255,255,0.1)",
  borderRadius: "8px", // Match SendOtp.jsx
  color: "white",
  outline: "none",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
  boxSizing: "border-box",
  marginBottom: "1rem",
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

export default ResetPassword;