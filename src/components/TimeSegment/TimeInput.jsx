import React from 'react';
import './TimeInput.css';
import { formatTime } from '../../utils/timeUtils';

const TimeInput = ({ label, value, min, max, onChange }) => {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="time-input">
      <div className="time-input-header">
        <label>{label}</label>
        <span className="time-display">{formatTime(value)}</span>
      </div>
      <div className="time-input-slider">
        <input
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={handleChange}
        />
        <div className="time-markers">
          <span>{formatTime(min)}</span>
          <span>{formatTime(max)}</span>
        </div>
      </div>
    </div>
  );
};
export default TimeInput;