import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`/bookings/${bookingId}`);
        alert('Booking canceled successfully!');
        setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to cancel booking.');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading bookings...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg shadow-md p-4">
              <EventCard event={booking.event} />
              <p className="mt-2">Quantity: {booking.quantity}</p>
              <p>Total Price: ${booking.totalPrice.toFixed(2)}</p>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;