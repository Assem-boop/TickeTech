import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const BookTicketForm = ({ eventId, ticketPrice, availableTickets }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(ticketPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(quantity * ticketPrice);
  }, [quantity, ticketPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity < 1 || quantity > availableTickets) {
      alert(`You can book between 1 and ${availableTickets} tickets.`);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/events/${eventId}/bookings`, { quantity });
      navigate('/bookings');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Book Tickets</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Quantity:</label>
        <input
          type="number"
          min="1"
          max={availableTickets}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <span className="block text-gray-700">Total Price: ${totalPrice.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || availableTickets === 0}
        className={`w-full py-2 rounded text-white ${
          availableTickets === 0
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isSubmitting ? 'Booking...' : availableTickets === 0 ? 'Sold Out' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookTicketForm;