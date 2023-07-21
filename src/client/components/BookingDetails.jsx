import React, { useState, useEffect } from "react";

const BookingDetails = ({ booking, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(booking.title);
  const [start, setStart] = useState(
    new Date(booking.start).toISOString().slice(0, -8)
  );
  const [end, setEnd] = useState(
    new Date(booking.end).toISOString().slice(0, -8)
  );

  useEffect(() => {
    setTitle(booking.title);
    setStart(new Date(booking.start).toISOString().slice(0, -8));
    setEnd(new Date(booking.end).toISOString().slice(0, -8));
  }, [booking]);

  const handleUpdate = () => {
    const updatedBooking = {
      ...booking,
      title,
      start,
      end,
    };
    onUpdate(updatedBooking);
  };

  const handleDelete = () => {
    onDelete(booking.id);
  };

  return (
    <div>
      <h3>Edit Booking</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <br />
      <label>End Time:</label>
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <br />
      <button onClick={handleUpdate}>Update Booking</button>
      <button onClick={handleDelete}>Delete Booking</button>
    </div>
  );
};

export default BookingDetails;
