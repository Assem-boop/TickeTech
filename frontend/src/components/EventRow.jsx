
import React from "react";

const EventRow = ({ event, onUpdateStatus }) => {
  const { title, date, location, status, _id } = event;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.07)",
        padding: "1rem",
        borderRadius: "10px",
        marginBottom: "1rem",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{title}</h3>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Status:</strong> <span style={{ textTransform: "capitalize" }}>{status}</span></p>

      {status === "pending" && (
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            onClick={() => onUpdateStatus(_id, "approved")}
            style={buttonStyle("#00e676")}
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(_id, "declined")}
            style={buttonStyle("#ff4f4f")}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = (color) => ({
  padding: "10px 15px",
  backgroundColor: color,
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: `0 0 10px ${color}`,
});

export default EventRow;
