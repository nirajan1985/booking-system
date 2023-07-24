import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import CustomEvent from "./CustomEvent";
import { useBooking } from "../hooks/useBooking";
import { useBookingMutation } from "../hooks/useBookingMutation";

const localizer = momentLocalizer(moment);

const BookingSystem = () => {
  const { data: bookings = [], isLoading, isError, error } = useBooking(); //TODO do something on error, and maybe show loading spinner?
  const { createBooking, updateBooking, deleteBooking } = useBookingMutation();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Creating a new booking
  const handleCreateBooking = (newBooking) => {
    createBooking.mutate(newBooking);
  };

  // Updating an existing booking
  const handleUpdateBooking = (updatedBooking) => {
    updateBooking.mutate(updatedBooking);
    setSelectedBooking(null);
  };

  // Deleting a booking
  const handleDeleteBooking = (bookingId) => {
    deleteBooking.mutate(bookingId);
    setSelectedBooking(null);
  };

  // Selecting a booking from the calendar
  const handleSelectBooking = (event) => {
    const selectedBooking = bookings.find((booking) => booking.id === event.id);
    setSelectedBooking(selectedBooking);
  };
  return (
    <div className="app-booking">
      <h2>Booking System</h2>
      <div>
        <Calendar
          localizer={localizer}
          events={bookings}
          selectable
          onSelectEvent={handleSelectBooking}
          onSelectSlot={() => setSelectedBooking(null)}
          style={{ height: "500px", width: "700px" }}
          components={{
            event: CustomEvent,
          }}
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
