import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches bookings from the API and transforms the data to the correct format.
 *
 * @return {Promise} A promise that resolves to the data returned by the API.
 */
const fetchBookings = async () => {
  const response = await axios.get("http://localhost:8080/api/bookings");
  const bookings = response.data.data;
  return bookings.map((booking) => {
    return {
      id: booking.id,
      title: booking.bookingTitle, // Replace this with actual title, if available
      start: new Date(booking.startTime),
      end: new Date(booking.endTime),
    };
  });
};

/**
 * Generates a function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @return {type} The function comment in markdown format.
 */
export const useBooking = () => {
  return useQuery(["bookings"], fetchBookings);
};
