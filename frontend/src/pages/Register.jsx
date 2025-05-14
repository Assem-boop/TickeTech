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
    <div style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2>Sign Up</h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: step === s ? "#007bff" : "#ccc",
              margin: "0 5px",
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

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
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
  );
};

const inputStyle = {
  display: "block",
  marginBottom: "1rem",
  padding: "10px",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Register;
