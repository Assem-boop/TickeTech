import React from "react";
import { useNavigate } from "react-router-dom";

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>🚀 Welcome, Organizer</h2>
        <p style={descStyle}>
          Manage your events, track performance, and shape the future of entertainment.
        </p>

        <div style={gridContainer}>
          <DashboardCard
            title="Create New Event"
            subtitle="Launch a new experience"
            icon="🆕"
            onClick={() => navigate("/create-event")}
          />
          <DashboardCard
            title="My Events"
            subtitle="View & edit your listings"
            icon="📄"
            onClick={() => navigate("/organizer-my-events")}
          />
          <DashboardCard
            title="Analytics"
            subtitle="Understand your performance"
            icon="📊"
            onClick={() => navigate("/organizer-analytics")}
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, subtitle, icon, onClick }) => (
  <div style={cardStyle} onClick={onClick}>
    <div style={iconStyle}>{icon}</div>
    <h3 style={cardTitle}>{title}</h3>
    <p style={cardSubtitle}>{subtitle}</p>
  </div>
);

// 💎 Styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "3rem",
  width: "100%",
  maxWidth: "1000px",
  boxShadow: "0 0 40px rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2rem",
  marginBottom: "0.5rem",
};

const descStyle = {
  fontSize: "1rem",
  color: "#aaa",
  marginBottom: "2.5rem",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.07)",
  padding: "1.5rem",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.2)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
};
const iconStyle = {
  fontSize: "2rem",
  marginBottom: "0.7rem",
};

const cardTitle = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  marginBottom: "0.3rem",
};

const cardSubtitle = {
  fontSize: "0.9rem",
  color: "#ccc",
};

export default OrganizerDashboard;
