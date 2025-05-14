import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put("/api/v1/forgetPassword", {
        email,
        newPassword,
      });
      setSuccess("✅ Password updated! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Reset Password</h2>

        <div style={stepIndicator}>
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                backgroundColor: step === s ? "#00bcd4" : "#777",
                margin: "0 6px",
                boxShadow: step === s ? "0 0 8px #00bcd4" : "none",
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          )}

          {step === 2 && (
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
              required
            />
          )}

          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}

          <div style={buttonGroup}>
            {step === 1 ? (
              <button type="button" onClick={handleNext} style={buttonStyle}>
                Next
              </button>
            ) : (
              <button type="submit" style={buttonStyle}>
                Confirm Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// 🎨 Styles
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
  marginBottom: "1.5rem",
};

const stepIndicator = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "1rem",
  fontSize: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  outline: "none",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "center",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 0 10px #00bcd4",
};

const errorStyle = {
  color: "#ff4f4f",
  marginTop: "0.5rem",
  textAlign: "center",
  fontWeight: "bold",
};

const successStyle = {
  color: "#00e676",
  marginTop: "0.5rem",
  textAlign: "center",
  fontWeight: "bold",
};

export default ForgetPassword;
