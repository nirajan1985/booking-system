import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const BookingDetails = ({ booking, onUpdate, onDelete }) => {
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

    // Check if the booking falls on a weekday (Monday to Friday), Sunday counted 0 as start of week and Saturday counted 6 as last day of week.
    if (startTime.getDay() === 0 || startTime.getDay() === 6) {
      alert("Bookings are allowed only during weekdays (Monday to Friday).");
      return;
    }

    // Check if the booking starts or ends before 7 AM or after 5 PM
    if (startTime.getHours() < 7 || endTime.getHours() > 17) {
      alert("Bookings are allowed only during working hours (7 AM to 5 PM).");
      return;
    }

    // Calculate the duration of the booking in milliseconds
    const bookingDuration = endTime.getTime() - startTime.getTime();

    // Check if the booking duration exceeds 3 hours (in milliseconds, 3 hours = 3 * 60 * 60 * 1000)
    if (bookingDuration > 3 * 60 * 60 * 1000) {
      alert("Maximum booking duration is 3 hours per day.");
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
