// BookingForm.js
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { validateBooking } from "./BookingUtils.js";

const BookingForm = ({
  booking,
  onSave,

  onCancel,
  existingBookings,
}) => {
  const isEditMode = !!booking;
  const [title, setTitle] = useState(isEditMode ? booking.title : "");
  const [start, setStart] = useState(
    isEditMode ? format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm") : ""
  );
  const [end, setEnd] = useState(
    isEditMode ? format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm") : ""
  );
  useEffect(() => {
    if (isEditMode) {
      setTitle(booking.title);
      setStart(format(new Date(booking.start), "yyyy-MM-dd'T'HH:mm"));
      setEnd(format(new Date(booking.end), "yyyy-MM-dd'T'HH:mm"));
    } else {
      setTitle("");
      setStart("");
      setEnd("");
    }
  }, [booking, isEditMode]);

  const handleAction = (e) => {
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

    const bookingData = {
      title,
      start,
      end,
    };

    if (isEditMode) {
      onSave({ ...booking, ...bookingData });
    } else {
      onSave(bookingData);
    }

    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleAction} className="form-booking">
      <h2>{isEditMode ? "Edit Booking" : "Create Booking"}</h2>
      <label>Booking Title:</label>
      <input
        type="text"
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

      <button className="button">{isEditMode ? "Update" : "Save"}</button>
      {isEditMode && (
        <button type="button" onClick={onCancel} className="button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default BookingForm;
