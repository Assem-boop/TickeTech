import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h1 style={titleStyle}>Admin Control Panel</h1>
        <p style={descStyle}>Manage events and users effortlessly with full power.</p>

        <div style={gridStyle}>
          <button onClick={() => navigate("/admin/events")} style={cardStyle}>
            🗂️ Manage Events
            <p style={cardDesc}>View all events & approve/reject pending ones</p>
          </button>

          <button onClick={() => navigate("/admin/users")} style={cardStyle}>
            👥 Manage Users
            <p style={cardDesc}>View, update roles, and remove users</p>
          </button>
        </div>
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
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "20px",
  padding: "3rem",
  maxWidth: "650px",
  width: "100%",
  color: "white",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 0 40px rgba(0,0,0,0.4)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const descStyle = {
  fontSize: "1rem",
  marginBottom: "2.5rem",
  color: "#ddd",
};

const gridStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const cardStyle = {
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  padding: "1.2rem",
  borderRadius: "12px",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  boxShadow: "0 0 12px rgba(0,188,212,0.4)",
  textAlign: "left",
};

const cardDesc = {
  fontSize: "0.85rem",
  color: "#bbb",
  marginTop: "0.5rem",
};

export default AdminDashboard;