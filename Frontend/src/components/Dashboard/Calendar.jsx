import React, { useState } from "react";

const Calendar = () => {

  const handleAddToCalendar = () => {
    const url =
      "https://calendar.google.com/calendar/u/0/r?cid=fe095da67a3af839f254a080709fddee966fd2e1d8fe06052e1b6b0909328326@group.calendar.google.com";

    const width = 1000;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      url,
      "AddToCalendar",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };


  return (
    <div className="calendar">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&title=Event%20Calendar&src=ZmUwOTVkYTY3YTNhZjgzOWYyNTRhMDgwNzA5ZmRkZWU5NjZmZDJlMWQ4ZmUwNjA1MmUxYjZiMDkwOTMyODMyNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E4C441"
        style={{ border: "solid 2px #ff7b00" }}
        width="800"
        height="600"
        frameBorder="0"
      ></iframe>

      <div className="calendar-buttons" style={{ marginTop: "10px" }}>
        <button className="btn" onClick={handleAddToCalendar}>Add to Calendar</button>
        <button className="btn" onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    </div>
  );
};

export default Calendar;
