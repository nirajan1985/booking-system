import React, { useState } from "react";

const BookingForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      title,
      start,
      end,
    };
    console.log(newBooking);
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

      <button className="button">Create Booking</button>
    </form>
  );
};

export default BookingForm;
