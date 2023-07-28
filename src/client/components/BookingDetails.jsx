import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { validateBooking } from "./BookingUtils";

const BookingDetails = ({ booking, onUpdate, onDelete, existingBookings }) => {
  const [title, setTitle] = useState(booking.title);
  const [start, setStart] = useState(
    format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm")
  );
  const [end, setEnd] = useState(
    format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm")
  );

  useEffect(() => {
    setTitle(booking.title);
    setStart(format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm"));
    setEnd(format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm"));
  }, [booking]);

  const handleUpdate = () => {
    if (!title || !start || !end) {
      alert("All fields are compulsory");
      return;
    }

    const startTime = new Date(start);
    const endTime = new Date(end);

    const validationError = validateBooking(
      startTime,
      endTime,
      existingBookings
    );

    if (validationError) {
      alert(validationError);
      return;
    }

    const updatedBooking = {
      ...booking,
      title,
      start,
      end,
    };

    onUpdate(updatedBooking);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking ?"
    );
    if (confirmed) onDelete(booking.id);
  };

  return (
    <div className="form-details">
      <h2>Edit Booking</h2>
      <label>Meeting Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <button onClick={handleUpdate} className="button">
        Update Booking
      </button>
      <button onClick={handleDelete} className="button">
        Delete Booking
      </button>
    </div>
  );
};

export default BookingDetails;
