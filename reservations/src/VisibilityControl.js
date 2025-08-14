// VisibilityControl.js
import React from 'react';

export default function VisibilityControl({ description, isChecked, callback }) {
  const handleChange = (e) => callback(e.target.checked);

  return (
    <div className="form-check d-inline-flex align-items-center">
      <input
        id="visibilityToggle"
        type="checkbox"
        className="form-check-input me-2"
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor="visibilityToggle">
        Show {description}
      </label>
    </div>
  );
}