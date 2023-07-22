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
    const updatedBooking = {
      ...booking,
      title,
      start,
      end,
    };
    console.log(updatedBooking);
    onUpdate(updatedBooking);
  };

  const handleDelete = () => {
    onDelete(booking.id);
  };

  return (
    <div>
      <h3>Edit Booking</h3>
      <label>Meeting Title:</label>
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
