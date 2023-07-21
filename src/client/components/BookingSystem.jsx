import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";

const localizer = momentLocalizer(moment);

const BookingSystem = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Creating a new booking
  const handleCreateBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <div>
      <h2>Booking System</h2>
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={bookings}
          selectable
          onSelectSlot={(slotInfo) => setSelectedBooking(null)}
        />
      </div>
      <BookingForm onCreate={handleCreateBooking} />
    </div>
  );
};

export default BookingSystem;
