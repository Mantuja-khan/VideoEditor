import React from 'react';
import { formatTimeInput, parseTimeInput } from '../../utils/timeUtils';
import './TimeInput.css';

const TimeInput = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = React.useState(formatTimeInput(value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const seconds = parseTimeInput(newValue);
    if (seconds !== null) {
      onChange(seconds);
    }
  };

  React.useEffect(() => {
    setInputValue(formatTimeInput(value));
  }, [value]);

  return (
    <div className="time-input-container">
      <label>{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="MM:SS.ms"
        className="time-input-field"
      />
    </div>
  );
};

export default TimeInput;