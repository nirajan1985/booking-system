import React, { useState } from "react";

const BookingForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleCreate = () => {
    const newBooking = {
      id: Date.now(),
      title,
      start,
      end,
    };
    console.log(newBooking);
    onCreate(newBooking);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
  };

  return (
    <div>
      <h3>Create Booking</h3>
      <label>Meeting Title:</label>
      <input
        type="text"
        placeholder="Title"
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
      <button onClick={handleCreate}>Create Booking</button>
    </div>
  );
};

export default BookingForm;
