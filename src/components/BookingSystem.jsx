import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";
import CustomEvent from "./CustomEvent";
import { useBooking } from "../hooks/useBooking";
import { useBookingMutation } from "../hooks/useBookingMutation";

const localizer = momentLocalizer(moment);

const BookingSystem = ({ bookings, onCreate, onDelete }) => {
  console.log(bookings);

  const [selectedBooking, setSelectedBooking] = useState(null);

  if (!bookings) {
    return <div>No bookings available</div>;
  }
  const handleSelectBooking = (event) => {
    const selectedBooking = bookings?.find(
      (booking) => booking.id === event.id
    );
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

      <BookingForm
        existingBookings={bookings}
        booking={selectedBooking} // Pass the selected booking for editing, or null for creating a new booking
        onCreate={onCreate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default BookingSystem;
