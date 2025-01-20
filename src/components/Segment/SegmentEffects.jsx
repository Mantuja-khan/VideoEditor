import React from 'react';
import { FaPlayCircle, FaMagic } from 'react-icons/fa';

const SegmentEffects = ({ speed, filter, onSpeedChange, onFilterChange }) => {
  return (
    <div className="segment-effects">
      <div className="effect-group">
        <label className="effect-label">
          <FaPlayCircle />
          Playback Speed
        </label>
        <select 
          className="effect-select"
          value={speed} 
          onChange={(e) => onSpeedChange(Number(e.target.value))}
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
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value)}
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
  );
};
export default SegmentEffects;