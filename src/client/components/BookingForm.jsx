import React, { useState } from "react";

const BookingForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

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
