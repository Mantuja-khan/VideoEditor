import React from 'react';
import TimeInput from './TimeInput';
import '../styles/TimeSegment.css';

const TimeSegment = ({ startTime, endTime, duration, onStartChange, onEndChange }) => {
  return (
    <div className="time-segment">
      <TimeInput
        label="Start"
        value={startTime}
        max={endTime}
        duration={duration}
        onChange={onStartChange}
      />
      <TimeInput
        label="End"
        value={endTime}
        min={startTime}
        max={duration}
        duration={duration}
        onChange={onEndChange}
      />
    </div>
  );
};

export default TimeSegment;