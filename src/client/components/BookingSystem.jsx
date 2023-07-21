import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";

const localizer = momentLocalizer(moment);

const BookingSystem = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Creating a new booking
  const handleCreateBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  // Updating an existing booking
  const handleUpdateBooking = (updatedBooking) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookings(updatedBookings);
    setSelectedBooking(null);
  };

  // Deleting a booking
  const handleDeleteBooking = (bookingId) => {
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );
    setBookings(updatedBookings);
    setSelectedBooking(null);
  };

  // Selecting a booking from the calendar
  const handleSelectBooking = (event) => {
    const selectedBooking = bookings.find((booking) => booking.id === event.id);
    setSelectedBooking(selectedBooking);
  };
  return (
    <div>
      <h2>Booking System</h2>
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={bookings}
          selectable
          onSelectEvent={handleSelectBooking}
          onSelectSlot={() => setSelectedBooking(null)}
        />
      </div>
      {selectedBooking ? (
        <BookingDetails
          booking={selectedBooking}
          onUpdate={handleUpdateBooking}
          onDelete={handleDeleteBooking}
        />
      ) : (
        <BookingForm onCreate={handleCreateBooking} />
      )}
    </div>
  );
};

export default BookingSystem;
