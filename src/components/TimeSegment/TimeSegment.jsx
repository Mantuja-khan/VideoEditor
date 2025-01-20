import React from 'react';
import TimeInput from './TimeInput';
import './TimeSegment.css';

const TimeSegment = ({ startTime, endTime, duration, onStartChange, onEndChange }) => {
  // Function to handle start time change
  const handleStartTimeChange = (newStartTime) => {
    // Ensure start time doesn't exceed end time
    const validStartTime = Math.min(newStartTime, endTime);
    onStartChange(validStartTime);
  };

  // Function to handle end time change
  const handleEndTimeChange = (newEndTime) => {
    // Ensure end time isn't less than start time
    const validEndTime = Math.max(newEndTime, startTime);
    onEndChange(validEndTime);
  };

  return (
    <div className="time-segment">
      <div className="time-segment-header">
        <h3>Segment Timeline</h3>
      </div>
      <div className="time-segment-controls">
        <TimeInput
          label="Start Time"
          value={startTime}
          min={0}
          max={duration}
          onChange={handleStartTimeChange}
        />
        <TimeInput
          label="End Time"
          value={endTime}
          min={0}
          max={duration}
          onChange={handleEndTimeChange}
        />
      </div>
    </div>
  );
};
export default TimeSegment;