// BookingForm.js
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { validateBooking } from "./BookingUtils.js";

const BookingForm = ({
  booking,
  onCreate,
  onUpdate,
  onDelete,
  existingBookings,
}) => {
  const isEditMode = !!booking;

  const initialFormData = {
    id: "",
    title: "",
    start: "",
    end: "",
  };

  console.log("SELECTED BOOKING", booking);
  const [formData, setFormData] = useState(initialFormData);

  const formatLocalDateTime = (utcDateTime) => {
    const localDate = new Date(utcDateTime);
    return format(localDate, "yyyy-MM-dd'T'HH:mm");
  };
  // console.log("booking", booking);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...formData,
        id: booking.id,
        title: booking.title,
        start: formatLocalDateTime(booking.start),
        end: formatLocalDateTime(booking.end),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode, booking]);

  const handleAction = (e) => {
    e.preventDefault();

    const startTime = new Date(formData.start);
    const endTime = new Date(formData.end);

    const validationError = validateBooking(
      startTime,
      endTime,
      existingBookings,
      booking
    );

    if (validationError) {
      alert(validationError);
      return;
    }

    const newBooking = {
      ...formData,
      start: startTime,
      end: endTime,
    };

    if (isEditMode) {
      onUpdate({ ...booking, ...newBooking });
    } else {
      onCreate(newBooking);
    }

    setFormData(initialFormData);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    console.log("BOOKING ID", booking.id);
    if (confirmed) {
      onDelete(booking.id);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleAction} className="form-booking">
      <h2>{isEditMode ? "Edit Booking" : "Create Booking"}</h2>
      <label>Booking Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Start Time:</label>
      <input
        type="datetime-local"
        name="start"
        value={formData.start}
        onChange={handleChange}
        required
      />

      <label>End Time:</label>
      <input
        type="datetime-local"
        name="end"
        value={formData.end}
        onChange={handleChange}
        required
      />

      <button className="button">{isEditMode ? "Update" : "Save"}</button>
      {isEditMode && (
        <button type="button" onClick={handleDelete} className="button">
          Delete
        </button>
      )}
    </form>
  );
};

export default BookingForm;
