import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

const UserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load user data");
      });
  }, [id]);

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>User Details</h2>

        {error && <p style={errorStyle}>{error}</p>}

        {userData ? (
          <div>
            <p><strong>ID:</strong> {userData._id}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Created:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          !error && <p>Loading user...</p>
        )}
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
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  width: "90%",
  maxWidth: "500px",
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "2rem",
};

const errorStyle = {
  color: "#ff4f4f",
  marginTop: "1rem",
  textAlign: "center",
  fontWeight: "bold",
};

export default UserDetails;
