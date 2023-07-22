import React from "react";
import moment from "moment";

const CustomEvent = ({ event }) => {
  const startTime = moment(event.start).format("HH:mm");
  const endTime = moment(event.end).format("HH:mm");

  return (
    <div>
      <strong>{event.title}</strong>
      <p>
        {startTime}-{endTime}
      </p>
    </div>
  );
};

export default CustomEvent;
