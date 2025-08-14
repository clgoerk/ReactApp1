import React, { useState } from 'react';

export default function ReservationRow({ item, toggle, deleteReservation, editReservation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.action);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    editReservation?.(item, trimmed);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            className="form-control"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') { setDraft(item.action); setIsEditing(false); }
            }}
            autoFocus
          />
        ) : (
          item.action
        )}
      </td>

      <td>
        <input
          type="checkbox"
          checked={item.booked}
          onChange={() => toggle(item)}
        />
      </td>

      <td>
        {!item.booked && editReservation && (
          <>
            {!isEditing ? (
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            ) : (
              <>
                <button className="btn btn-sm btn-primary me-2" onClick={save}>
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => { setDraft(item.action); setIsEditing(false); }}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}

        {item.booked && deleteReservation && (
          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReservation(item)}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}