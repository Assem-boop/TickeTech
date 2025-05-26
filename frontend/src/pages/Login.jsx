import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/v1/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role?.toLowerCase();
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "organizer") {
        navigate("/organizer-dashboard");
      } else if (role === "standard") {
        navigate("/bookings");
      } else {
        setError("Unknown role. Access denied.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed";
      setError(msg);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>TickeTech Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={fieldWrapper}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={fieldWrapper}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <p style={linkWrapper}>
              <a href="/forgot-password" style={linkStyle}>
                Forgot Password?
              </a>
            </p>
          </div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
          {error && <p style={errorStyle}>{error}</p>}
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
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  width: "90%",
  maxWidth: "420px",
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "2rem",
  fontSize: "1.8rem",
  letterSpacing: "1px",
  fontWeight: "600",
};

const fieldWrapper = {
  marginBottom: "1.2rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  outline: "none",
  boxSizing: "border-box",
};

const linkWrapper = {
  textAlign: "right",
  marginTop: "0.3rem",
  marginBottom: "1rem",
};

const linkStyle = {
  fontSize: "0.95rem",
  color: "#00bcd4",
  textDecoration: "none",
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

export default Login;