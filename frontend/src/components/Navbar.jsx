import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
          TickeTech
        </Link>
      </div>
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>

        {!user && (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "Admin" && (
              <Link to="/admin-dashboard" style={{ marginRight: "1rem" }}>
                Admin Panel
              </Link>
            )}
            {user.role === "Organizer" && (
              <Link to="/organizer-dashboard" style={{ marginRight: "1rem" }}>
                My Events
              </Link>
            )}
            {user.role === "Standard" && (
              <Link to="/bookings" style={{ marginRight: "1rem" }}>
                My Bookings
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
