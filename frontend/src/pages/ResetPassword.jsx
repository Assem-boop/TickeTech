import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // 🔑 Required for backend
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("otpEmail");
    if (!savedEmail) {
      setError("Missing email. Please restart the process.");
    } else {
      setEmail(savedEmail);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.put("/api/v1/forgot-password/reset-password", {
        email,
        code: otp, // 🔑 Required
        newPassword: password,
      });

      setSuccess("✅ Password reset! Redirecting...");
      localStorage.removeItem("otpEmail");
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
            type="text"
            placeholder="Enter OTP again"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={inputStyle}
          />
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

// 🎨 Styles remain the same (reuse from previous pages)
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
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
  fontSize: "1.7rem",
  marginBottom: "1.5rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
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

export default ResetPassword;
