import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      console.log("📦 Fetching bookings with token:", token);

      try {
        const res = await api.get("/api/v1/users/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Raw bookings response:", res.data);

        const bookingsData = res.data.map((booking, index) => {
          const tickets = booking.numberOfTickets;
          const hasField = tickets !== undefined && tickets !== null;

          console.log(
            `🔍 Booking #${index + 1}:`,
            `Event=${booking.event?.title || "?"}`,
            `Tickets=${tickets}`,
            `Has numberOfTickets? => ${hasField}`
          );

          return {
            ...booking,
            numberOfTickets: hasField ? tickets : 0,
          };
        });

        console.log("✅ Processed bookings data:", bookingsData);
        setBookings(bookingsData);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    console.log(`🗑 Cancelling booking with ID: ${id}`);
    try {
      await api.delete(`/api/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
      console.log("✅ Cancelled successfully");
    } catch (err) {
      console.error("❌ Cancel booking error:", err);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>My Bookings</h2>
        {loading ? (
          <p style={infoText}>Loading...</p>
        ) : error ? (
          <p style={errorStyle}>{error}</p>
        ) : bookings.length === 0 ? (
          <p style={infoText}>No bookings yet.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Tickets</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id}>
                  <td style={tdStyle}>{b.event?.title || "N/A"}</td>
                  <td style={tdStyle}>
                    {b.event?.date
                      ? new Date(b.event.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={tdStyle}>{b.event?.location || "N/A"}</td>
                  <td style={tdStyle}>
                    {b.numberOfTickets !== undefined
                      ? b.numberOfTickets
                      : "❌ Missing"}
                  </td>
                  <td style={tdStyle}>${b.totalPrice}</td>
                  <td style={tdStyle}>Confirmed</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleCancel(b._id)}
                      style={cancelButton}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// 🎨 Styles
const pageStyle = {
  height: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const glassBox = {
  width: "100%",
  maxWidth: "1100px",
  padding: "2rem",
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "white",
};

const titleStyle = {
  fontSize: "1.8rem",
  marginBottom: "1.5rem",
  textAlign: "center",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
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
  verticalAlign: "top",
};

const cancelButton = {
  backgroundColor: "#ff5252",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 10px #ff5252",
};

const infoText = {
  textAlign: "center",
  fontStyle: "italic",
};

const errorStyle = {
  color: "#ff4f4f",
  fontWeight: "bold",
  textAlign: "center",
};

export default MyBookings;