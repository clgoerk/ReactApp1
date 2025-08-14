import React from 'react';

function ReservationBanner({ userName, reservationItems }) {
  const availableCount = reservationItems.filter(r => !r.booked).length;
  const bookedCount = reservationItems.filter(r => r.booked).length;

  return (
    <h4 className="bg-success text-white p-2 d-flex justify-content-between align-items-center rounded">
      <span>
        {userName}'s Reservation List — {availableCount} available
      </span>
      <span>
        {bookedCount} Booked
      </span>
    </h4>
  );
}

export default ReservationBanner;