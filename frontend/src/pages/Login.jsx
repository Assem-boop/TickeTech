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
      const res = await axios.post("/api/v1/login", formData);
      const { token, user } = res.data;

      // ✅ Save to localStorage correctly
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // stringified!

      console.log("✅ Logged in user:", user);

      // ✅ Redirect based on role
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
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
