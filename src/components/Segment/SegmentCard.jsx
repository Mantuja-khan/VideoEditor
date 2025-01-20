import React from 'react';
import { FaClock, FaPlayCircle, FaMagic, FaFlag, FaFlagCheckered } from 'react-icons/fa';
import TimeInput from './TimeInput';
import './SegmentCard.css';

const SegmentCard = ({ segment, currentTime = 0, duration = 0, onUpdate }) => {
  const handleSetStartTime = () => {
    if (typeof currentTime !== 'number') return;
    const newStartTime = parseFloat(currentTime.toFixed(2));
    if (!isNaN(newStartTime) && newStartTime >= 0 && newStartTime < segment.endTime) {
      onUpdate({ ...segment, startTime: newStartTime });
    }
  };

  const handleSetEndTime = () => {
    if (typeof currentTime !== 'number') return;
    const newEndTime = parseFloat(currentTime.toFixed(2));
    if (!isNaN(newEndTime) && newEndTime > segment.startTime && newEndTime <= duration) {
      onUpdate({ ...segment, endTime: newEndTime });
    }
  };

  const handleStartTimeChange = (time) => {
    const newTime = parseFloat(time);
    if (!isNaN(newTime) && newTime >= 0 && newTime < segment.endTime) {
      onUpdate({ ...segment, startTime: newTime });
    }
  };

  const handleEndTimeChange = (time) => {
    const newTime = parseFloat(time);
    if (!isNaN(newTime) && newTime > segment.startTime && newTime <= duration) {
      onUpdate({ ...segment, endTime: newTime });
    }
  };

  return (
    <div className="segment-card">
      <div className="segment-card-header">
        <div className="segment-title">
          <span className="segment-number">{segment.id}</span>
          <h3>Segment {segment.id}</h3>
        </div>
        <div className="segment-duration">
          <FaClock />
          <span>{((segment.endTime - segment.startTime).toFixed(2))}s</span>
        </div>
      </div>
      
      <div className="segment-card-content">
        <div className="segment-time-controls">
          <div className="time-control-group">
            <TimeInput
              label="Start Time"
              value={segment.startTime}
              onChange={handleStartTimeChange}
            />
            <button 
              className="time-control-btn start-btn" 
              onClick={handleSetStartTime}
              title="Set start time to current position"
            >
              <FaFlag /> Set Current
            </button>
          </div>
          
          <div className="time-control-group">
            <TimeInput
              label="End Time"
              value={segment.endTime}
              onChange={handleEndTimeChange}
            />
            <button 
              className="time-control-btn end-btn" 
              onClick={handleSetEndTime}
              title="Set end time to current position"
            >
              <FaFlagCheckered /> Set Current
            </button>
          </div>
        </div>
        
        <div className="segment-effects">
          <div className="effect-group">
            <label className="effect-label">
              <FaPlayCircle />
              Playback Speed
            </label>
            <select 
              className="effect-select"
              value={segment.speed} 
              onChange={(e) => onUpdate({ ...segment, speed: Number(e.target.value) })}
            >
              <option value={0.5}>0.5x (Slow)</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x (Normal)</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x (Fast)</option>
            </select>
          </div>
          
          <div className="effect-group">
            <label className="effect-label">
              <FaMagic />
              Visual Effect
            </label>
            <select 
              className="effect-select"
              value={segment.filter} 
              onChange={(e) => onUpdate({ ...segment, filter: e.target.value })}
            >
              <option value="none">None</option>
              <option value="grayscale">Grayscale</option>
              <option value="sepia">Sepia</option>
              <option value="blur">Blur</option>
              <option value="brightness">Brightness</option>
              <option value="contrast">High Contrast</option>
              <option value="invert">Invert Colors</option>
              <option value="saturate">Vibrant</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentCard;