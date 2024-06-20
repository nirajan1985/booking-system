import { useEffect, useState } from "react";
import BookingSystem from "./components/BookingSystem.jsx";

function App() {
  const [bookings, setBookings] = useState(null);

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
      },
    ]);
  };
  const handleDeleteBooking = async (bookingId) => {
    const response = await fetch(
      `http://localhost:8080/api/bookings/${bookingId}`
    );
  };
  return (
    <div>
      <BookingSystem
        bookings={bookings}
        onCreate={handleCreateBooking}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
}

export default App;
