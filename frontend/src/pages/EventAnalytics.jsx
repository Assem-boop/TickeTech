import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
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
        setError("Failed to load analytics data");
        setLoading(false);
      });
  }, []);

  // Filter only events with bookings > 0 for chart display
  const eventsWithBookings = events.filter((e) => e.percentBooked > 0);

  return (
    <div style={pageStyle}>
      <div style={glassBox}>
        <h2 style={titleStyle}>📊 Your Events Ticket Sales Analytics</h2>
        <p style={subtitleStyle}>
          Visualize the percentage of tickets booked for each event you organize.
        </p>

        {loading && <p style={infoTextStyle}>Loading analytics data...</p>}
        {error && <p style={errorStyle}>{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p style={infoTextStyle}>You don’t have any events with ticket sales data yet.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Event Title</th>
                    <th style={thStyle}>Tickets Booked (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.eventId}>
                      <td style={tdStyle}>{event.title}</td>
                      <td style={tdStyle}>{event.percentBooked}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {eventsWithBookings.length > 0 && (
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={eventsWithBookings}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="title"
                      tick={{ fill: "white", fontWeight: "600" }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      tick={{ fill: "white", fontWeight: "600" }}
                      domain={[0, 100]}
                      tickFormatter={(tick) => `${tick}%`}
                    />
                    <Tooltip
                      formatter={(value) => `${value}% tickets booked`}
                      contentStyle={{
                        backgroundColor: "#0f3460",
                        borderRadius: "8px",
                        border: "none",
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ color: "#aaa", fontWeight: "600", fontSize: 14 }}
                    />
                    <Bar dataKey="percentBooked" fill="#00ffc8" name="Tickets Booked %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "3rem 1rem",
  paddingTop: "6rem", // if you have fixed navbar height, adjust padding top accordingly
};

const glassBox = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "2rem",
  width: "100%",
  maxWidth: "1100px",
  color: "white",
  boxShadow: "0 0 30px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  animation: "fadeIn 0.8s ease forwards",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "700",
  marginBottom: "0.5rem",
  color: "#00ffc8",
};

const subtitleStyle = {
  textAlign: "center",
  fontSize: "1.1rem",
  marginBottom: "2rem",
  color: "#a0a0a0",
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
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #444",
  verticalAlign: "top",
};

const errorStyle = {
  color: "#ff4f4f",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const infoTextStyle = {
  color: "#ccc",
  textAlign: "center",
  fontWeight: "500",
  marginBottom: "1rem",
};

export default EventAnalytics;
