import React from 'react';
import { formatTime } from '../utils/timeUtils';

const TimeInput = ({ label, value, min = 0, max, duration, onChange }) => {
  return (
    <div className="time-input">
      <label>{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>{formatTime(value)}</span>
    </div>
  );
};

export default TimeInput;