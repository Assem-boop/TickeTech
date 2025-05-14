import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Standard",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      setError("Please enter your name and email.");
      return;
    }
    if (step === 3 && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { name, email, role, password } = formData;
      await api.post("/api/v1/register", { name, email, role, password });
      setSuccess("✅ Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>Create Your TickeTech Account</h2>

        <div style={stepIndicator}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                height: "18px",
                width: "18px",
                borderRadius: "50%",
                backgroundColor: step === s ? "#00bcd4" : "#888",
                margin: "0 6px",
                boxShadow: step === s ? "0 0 8px #00bcd4" : "none",
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </>
          )}

          {step === 2 && (
            <>
              <label style={{ marginBottom: "0.5rem", display: "block" }}>
                Choose Role:
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Standard">Standard</option>
                <option value="Organizer">Organizer</option>
                <option value="Admin">Admin</option>
              </select>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </>
          )}

          {error && <p style={errorStyle}>{error}</p>}
          {success && <p style={successStyle}>{success}</p>}

          <div style={buttonGroup}>
            {step > 1 && (
              <button type="button" onClick={handleBack} style={buttonStyle}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={handleNext} style={buttonStyle}>
                Next
              </button>
            ) : (
              <button type="submit" style={buttonStyle}>
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// 🧩 Styles
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
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  width: "90%",
  maxWidth: "480px",
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "2rem",
  fontSize: "1.7rem",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  marginBottom: "1.2rem",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
  boxShadow: "0 0 10px #00bcd4",
  minWidth: "120px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1.5rem",
};

const stepIndicator = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
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

export default Register;
