
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={brandStyle}>
          🎟️ TickeTech
        </Link>
      </div>

      <div style={linkContainer}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/events" style={navLink}>All Events</Link>

        {!user ? (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/register" style={navLink}>Register</Link>
          </>
        ) : (
          <>
            {role === "admin" && (
              <>
                <Link to="/admin-dashboard" style={navLink}>Admin Panel</Link>
                <Link to="/admin/users" style={navLink}>Users</Link>
              </>
            )}

            {role === "organizer" && (
              <>
                <Link to="/organizer-dashboard" style={navLink}>Organizer Panel</Link>
                <Link to="/organizer-my-events" style={navLink}>My Events</Link>
              </>
            )}

            {role === "standard" && (
              <Link to="/bookings" style={navLink}>My Bookings</Link>
            )}

            <Link to="/profile" style={navLink}>My Profile</Link>

            <button onClick={handleLogout} style={logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// 🎨 Neon Cinematic Theme Styles
const navStyle = {
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
};

const brandStyle = {
  textDecoration: "none",
  fontWeight: "900",
  fontSize: "26px",
  color: "#00e676",
  textShadow: "0 0 10px #00e676",
};

const linkContainer = {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
};

const navLink = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
  position: "relative",
  transition: "color 0.3s ease-in-out",
};

const logoutButton = {
  backgroundColor: "transparent",
  color: "red",
  border: "1px solid red",
  padding: "6px 14px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default Navbar;
