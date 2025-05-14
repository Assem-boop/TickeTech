import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/v1/users/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/v1/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Error canceling booking:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading bookings...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} style={{ marginBottom: "1rem" }}>
              <strong>Event:</strong> {booking.event?.title || "N/A"} <br />
              <strong>Quantity:</strong> {booking.quantity} <br />
              <strong>Total Price:</strong> ${booking.totalPrice} <br />
              <button
                onClick={() => cancelBooking(booking._id)}
                style={{
                  marginTop: "0.5rem",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
