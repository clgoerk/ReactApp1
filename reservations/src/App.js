import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationBanner from './ReservationBanner';
import ReservationRow from './ReservationRow';
import ReservationCreator from './ReservationCreator';
import VisibilityControl from './VisibilityControl';

const defaultReservations = [
  { action: "Maple Grove - 9:00 AM – 12:00 PM", booked: false },
  { action: "Maple Grove - 12:00 PM – 3:00 PM", booked: false },
  { action: "Maple Grove - 3:00 PM – 6:00 PM", booked: false },
  { action: "Pine Ridge - 9:00 AM – 12:00 PM", booked: false },
  { action: "Pine Ridge - 12:00 PM – 3:00 PM", booked: false },
  { action: "Pine Ridge - 3:00 PM – 6:00 PM", booked: false },
  { action: "Lakeview - 9:00 AM – 12:00 PM", booked: false },
  { action: "Lakeview - 12:00 PM – 3:00 PM", booked: false },
  { action: "Lakeview - 3:00 PM – 6:00 PM", booked: false },
  { action: "Cedar Trail - 9:00 AM – 12:00 PM", booked: false },
  { action: "Cedar Trail - 12:00 PM – 3:00 PM", booked: false },
  { action: "Cedar Trail - 3:00 PM – 6:00 PM", booked: false }
];

function App() {
  const [userName, setUserName] = useState("Chris");
  const [reservationItems, setReservationItems] = useState(defaultReservations);
  const [showBooked, setShowBooked] = useState(true);

  const createNewReservation = (task) => {
    if (!reservationItems.find(item => item.action === task)) {
      const updated = [...reservationItems, { action: task, booked: false }];
      setReservationItems(updated);
      localStorage.setItem("reservations", JSON.stringify(updated));
    }
  };

  const toggleReservation = (item) => {
    const updated = reservationItems.map(row =>
      row.action === item.action ? { ...row, booked: !row.booked } : row
    );
    setReservationItems(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  const deleteReservation = (item) => {
    if (item.booked) {
      const updated = reservationItems.filter(row => row.action !== item.action);
      setReservationItems(updated);
      localStorage.setItem("reservations", JSON.stringify(updated));
    }
  };

  const editReservation = (oldItem, newAction) => {
    setReservationItems(
      reservationItems.map(item =>
        item.action === oldItem.action ? { ...item, action: newAction } : item
      )
    );
    localStorage.setItem("reservations", JSON.stringify(
      reservationItems.map(item =>
        item.action === oldItem.action ? { ...item, action: newAction } : item
      )
    ));
  };

  const clearBooked = () => {
    const updated = reservationItems.filter(item => !item.booked);
    setReservationItems(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setReservationItems(parsedData);
        }
      } else {
        setUserName("Chris");
        setReservationItems(defaultReservations);
        setShowBooked(true);
      }
    } catch (error) {
      console.error("Failed to load reservations:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <ReservationBanner userName={userName} reservationItems={reservationItems} />

      <div className="m-3">
        <ReservationCreator callback={createNewReservation} />
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Description</th>
            <th>Booked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationItems.filter(item => !item.booked).map(item => (
            <ReservationRow
              key={item.action}
              item={item}
              toggle={toggleReservation}
              editReservation={editReservation}
            />
          ))}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Booked Reservations"
          isChecked={showBooked}
          callback={(checked) => setShowBooked(checked)}
        />
      </div>

      {showBooked &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Description</th>
              <th style={{ width: "20%" }}>Booked</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationItems.filter(item => item.booked).map(item => (
              <ReservationRow
                key={item.action}
                item={item}
                toggle={toggleReservation}
                deleteReservation={deleteReservation}
              />
            ))}
          </tbody>
        </table>
      }

      {reservationItems.some(item => item.booked) && (
        <div className="text-center mt-3">
          <button
            className="btn btn-danger"
            onClick={clearBooked}
          >
            Clear All Booked
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
