import React, { useState } from "react";
import { validateBooking } from "./BookingUtils";

const BookingForm = ({ onCreate, existingBookings }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

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

    const newBooking = {
      id: Date.now(),
      title,
      start,
      end,
    };

    onCreate(newBooking);
    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleCreate} className="form-booking">
      <h2>Create Booking</h2>
      <label>Booking Title:</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />

      <button className="button">Save</button>
    </form>
  );
};

export default BookingForm;
