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
    <nav
      style={{
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
          TickeTech
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            {role === "admin" && (
              <>
                <Link to="/admin-dashboard">Admin Panel</Link>
                <Link to="/admin/users">Manage Users</Link>
              </>
            )}

            {role === "organizer" && (
              <>
                <Link to="/organizer-dashboard">Dashboard</Link>
                <Link to="/organizer-my-events">My Events</Link>
              </>
            )}

            {role === "standard" && (
              <Link to="/bookings">My Bookings</Link>
            )}

            <Link to="/profile">My Profile</Link>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "red",
                fontWeight: "bold",
                cursor: "pointer",
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
