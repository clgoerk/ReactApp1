import React, { useState } from 'react';

function ReservationCreator({ callback }) {
  const [newItemText, setNewItemText] = useState("");

  const updateNewTextValue = (event) => {
    setNewItemText(event.target.value);
  };

  const createNewReservation = () => {
    if (newItemText.trim() !== "") {
      callback(newItemText.trim());
      setNewItemText("");
    }
  };

  return (
    <div className="my-1">
      <div className="input-group">
        <input
          className="form-control"
          placeholder="e.g. Maple Grove - 09:00–12:00"
          value={newItemText}
          onChange={updateNewTextValue}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={createNewReservation}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ReservationCreator;


