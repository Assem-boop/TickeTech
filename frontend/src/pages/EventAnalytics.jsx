import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const EventAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/v1/users/events/analytics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics data.");
        setLoading(false);
      });
  }, []);

  const eventsWithBookings = events.filter((e) => e.percentBooked > 0);

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={styles.title}>📈 Event Ticket Sales Analytics</h2>
        <p style={styles.subtitle}>
          Visual representation of the booking percentage per event.
        </p>

        {loading && <p style={styles.info}>Loading analytics...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p style={styles.info}>No events or ticket bookings available yet.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Event Title</th>
                    <th style={styles.th}>Tickets Booked (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.eventId}>
                      <td style={styles.td}>{event.title}</td>
                      <td style={styles.td}>
                        <strong>{event.percentBooked}%</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {eventsWithBookings.length > 0 && (
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={eventsWithBookings}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      dataKey="title"
                      tick={{ fill: "white", fontWeight: "600" }}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      tick={{ fill: "white", fontWeight: "600" }}
                      domain={[0, 100]}
                      tickFormatter={(tick) => `${tick}%`}
                    />
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: "#1e1e2f",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "14px", color: "#fff" }} />
                    <Line
                      type="monotone"
                      dataKey="percentBooked"
                      stroke="#000"
                      strokeWidth={3}
                      name="Tickets Booked (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Styling
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "6rem",
    padding: "3rem 1rem",
  },
  box: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    borderRadius: "20px",
    padding: "2rem",
    maxWidth: "1100px",
    width: "100%",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    color: "#00ffc8",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#aaa",
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  th: {
    background: "#1e1e2f",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "1px solid #444",
  },
  td: {
    padding: "12px",
    color: "#eee",
    borderBottom: "1px solid #444",
  },
  info: {
    color: "#ccc",
    textAlign: "center",
    fontWeight: "500",
  },
  error: {
    color: "#ff4f4f",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "1rem",
  },
};

export default EventAnalytics;
