import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api
      .get("/api/v1/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  };

  const handleView = (id) => navigate(`/admin/user/${id}`);

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleUpdateRole = async (id, role) => {
    try {
      await api.put(
        `/api/v1/users/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages((prev) => ({ ...prev, [id]: "✅ Role updated!" }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [id]: "" })), 2000);
    } catch (err) {
      setMessages((prev) => ({
        ...prev,
        [id]: err.response?.data?.message || "❌ Update failed.",
      }));
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await api.delete(`/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessages((prev) => ({ ...prev, [id]: "🗑️ User deleted" }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [id]: "" })), 2000);
    } catch (err) {
      setMessages((prev) => ({
        ...prev,
        [id]: err.response?.data?.message || "❌ Deletion failed.",
      }));
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>All Users</h2>
        {error && <p style={errorStyle}>{error}</p>}

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      style={dropdownStyle}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Organizer">Organizer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <button style={viewBtn} onClick={() => handleView(user._id)}>
                      View
                    </button>
                    <button
                      style={updateBtn}
                      onClick={() => handleUpdateRole(user._id, user.role)}
                    >
                      Update
                    </button>
                    <button style={deleteBtn} onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                    {messages[user._id] && (
                      <span style={messageStyle}>{messages[user._id]}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 🖌 Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "2rem",
  width: "100%",
  maxWidth: "1000px",
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: "600",
  marginBottom: "1.5rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.95rem",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  backgroundColor: "#1e1e2f",
  color: "#fff",
  borderBottom: "1px solid #444",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #444",
  verticalAlign: "middle",
};

const dropdownStyle = {
  padding: "6px",
  borderRadius: "6px",
  backgroundColor: "#1e1e2f",
  color: "#fff",
  border: "1px solid #777",
};

const viewBtn = {
  padding: "6px 10px",
  backgroundColor: "#00bcd4",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginRight: "6px",
  cursor: "pointer",
};

const updateBtn = {
  padding: "6px 10px",
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  marginRight: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "6px 10px",
  backgroundColor: "#e53935",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const messageStyle = {
  display: "block",
  marginTop: "6px",
  fontSize: "0.85rem",
  fontWeight: "bold",
};

const errorStyle = {
  color: "#ff4f4f",
  marginBottom: "1rem",
  textAlign: "center",
  fontWeight: "bold",
};

export default AdminUsersPage;