import { useEffect, useState } from "react";
import BookingSystem from "./components/BookingSystem.jsx";

function App() {
  const [bookings, setBookings] = useState(null);

  console.log("BOOKINGS", bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("http://localhost:8080/api/bookings");
      const data = await response.json();
      console.log("data from app", data);
      const bookingsData = data.data.map((booking) => ({
        title: booking.bookingTitle,
        start: booking.startTime,
        end: booking.endTime,
        id: booking.id,
      }));
      setBookings(bookingsData);
    };
    fetchBookings();
  }, []);

  const handleCreateBooking = async (newBooking) => {
    const bookingData = {
      startTime: newBooking.start,
      endTime: newBooking.end,
      bookingTitle: newBooking.title,
      userId: 1, //TODO Hardcoded for simplicity sake
      roomId: 1, //TODO Hardcoded for simplicity sake
    };
    const response = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const createdBooking = await response.json();
    console.log("CREATEDBOOKING", createdBooking);
    setBookings((prev) => [
      ...prev,
      {
        title: createdBooking.bookingTitle,
        start: createdBooking.startTime,
        end: createdBooking.endTime,
        id: createdBooking.id,
      },
    ]);
  };
  const handleDeleteBooking = async (bookingId) => {
    if (!bookingId) {
      console.error("Invalid bookingId");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/api/bookings/${bookingId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedBookings = bookings.filter((b) => b.id !== bookingId);
      setBookings(updatedBookings);
    } else {
      console.error("Failed to delete booking");
    }
  };

  const handleUpdateBooking = async (updatedBooking) => {
    const bookingData = {
      startTime: updatedBooking.start,
      endTime: updatedBooking.end,
      bookingTitle: updatedBooking.title,
      userId: 1, //TODO Replace with actual user ID
      roomId: 1, //TODO Replace with actual room ID
    };

    const response = await fetch(
      `http://localhost:8080/api/bookings/${updatedBooking.id}`,
      {
        method: "PUT",
        body: JSON.stringify(bookingData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      );
      setBookings(updatedBookings);
    } else {
      console.error("Failed to update booking");
    }
  };
  return (
    <div>
      <BookingSystem
        bookings={bookings}
        onCreate={handleCreateBooking}
        onDelete={handleDeleteBooking}
        onUpdate={handleUpdateBooking}
      />
    </div>
  );
}

export default App;
