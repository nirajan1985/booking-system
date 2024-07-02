import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./BookingForm";
import CustomEvent from "./CustomEvent";

const localizer = momentLocalizer(moment);

const BookingSystem = ({ bookings, onCreate, onDelete, onUpdate }) => {
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
        booking={selectedBooking}
        onCreate={onCreate}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default BookingSystem;
