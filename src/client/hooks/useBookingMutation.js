import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { parseISO, formatISO } from "date-fns";

/**
 * Generates a mutation hook for booking operations.
 *
 * @return {Object} An object containing mutation functions for creating, updating, and deleting bookings.
 */
export const useBookingMutation = () => {
  const queryClient = useQueryClient();

  const createBooking = useMutation(
    (newBooking) => {
      const bookingData = {
        startTime: formatISO(parseISO(newBooking.start)),
        endTime: formatISO(parseISO(newBooking.end)),
        bookingTitle: newBooking.title,
        userId: 1, //TODO Hardcoded for simplicity sake
        roomId: 1, //TODO Hardcoded for simplicity sake
      };

      return axios.post("http://localhost:8080/api/bookings", bookingData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookings");
      },
    }
  );

  const updateBooking = useMutation(
    (updatedBooking) => {
      const bookingData = {
        startTime: formatISO(parseISO(updatedBooking.start)),
        endTime: formatISO(parseISO(updatedBooking.end)),
        bookingTitle: updatedBooking.title,
        userId: 1, //TODO Replace with actual user ID
        roomId: 1, //TODO Replace with actual room ID
      };

      return axios.put(
        `http://localhost:8080/api/bookings/${updatedBooking.id}`,
        bookingData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookings");
      },
    }
  );
  const deleteBooking = useMutation(
    (bookingId) =>
      axios.delete(`http://localhost:8080/api/bookings/${bookingId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookings");
      },
    }
  );

  return { createBooking, updateBooking, deleteBooking };
};
