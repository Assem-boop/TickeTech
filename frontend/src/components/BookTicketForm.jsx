import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const BookTicketForm = ({ eventId, ticketPrice, availableTickets }) => {
  const navigate = useNavigate();

  // Ensure ticketPrice and availableTickets are valid numbers
  const safeTicketPrice = typeof ticketPrice === 'number' ? ticketPrice : 0;
  const safeAvailableTickets =
    typeof availableTickets === 'number' ? availableTickets : 0;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(safeTicketPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTotalPrice(quantity * safeTicketPrice);
  }, [quantity, safeTicketPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity < 1 || quantity > safeAvailableTickets) {
      alert(`You can book between 1 and ${safeAvailableTickets} tickets.`);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/events/${eventId}/bookings`, { quantity });
      navigate('/bookings');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Booking failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error message if event data is invalid
  if (!eventId || safeTicketPrice <= 0 || safeAvailableTickets <= 0) {
    return (
      <div className="max-w-md p-6 bg-white rounded shadow-md">
        <p className="text-red-500 font-semibold">
          Invalid event data. Unable to book tickets.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">🎟️ Book Tickets</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Quantity:</label>
        <input
          type="number"
          min="1"
          max={safeAvailableTickets}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <span className="block text-gray-700 font-medium">
          Total Price: ${Number(totalPrice).toFixed(2)}
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || safeAvailableTickets === 0}
        className={`w-full py-2 rounded text-white font-semibold ${
          safeAvailableTickets === 0
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isSubmitting
          ? 'Booking...'
          : safeAvailableTickets === 0
          ? 'Sold Out'
          : 'Book Now'}
      </button>
    </form>
  );
};

export default BookTicketForm;