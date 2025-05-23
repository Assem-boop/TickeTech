import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import UpdateProfileForm from "../components/UpdateProfileForm";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loading state

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = res.data.user || res.data;
      setUser(userData);
    } catch (err) {
      console.error("❌ PROFILE FETCH FAILED:", err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false); // ✅ mark loading complete
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateSuccess = async () => {
    await fetchProfile();
    setShowEditForm(false);
  };

  // ✅ Show loader during initial fetch
  if (loading) {
    return (
      <div style={loaderWrapper}>
        <div style={spinner}></div>
      </div>
    );
  }

  if (error) return <p style={errorStyle}>{error}</p>;

  return (
    <div style={pageWrapper}>
      <div style={glassBox}>
        <h2 style={titleStyle}>My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {!showEditForm && (
          <button onClick={() => setShowEditForm(true)} style={buttonStyle}>
            Edit Profile
          </button>
        )}

        {showEditForm && (
          <UpdateProfileForm currentData={user} onSuccess={handleUpdateSuccess} />
        )}
      </div>
    </div>
  );
};

// 🎨 Loader Styles
const loaderWrapper = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const spinner = {
  width: "60px",
  height: "60px",
  border: "6px solid rgba(255, 255, 255, 0.2)",
  borderTopColor: "#00e676",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const pageWrapper = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  overflow: "hidden",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  width: "90%",
  maxWidth: "420px",
  color: "white",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "2rem",
};

const buttonStyle = {
  marginTop: "1.5rem",
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 0 15px #00bcd4",
};

const errorStyle = {
  color: "#ff4f4f",
  textAlign: "center",
};

// ⏳ CSS Keyframe (you must add this to your global CSS if using inline styles only):
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default ProfilePage;
