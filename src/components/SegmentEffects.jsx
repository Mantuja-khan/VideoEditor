import React from 'react';
import '../styles/SegmentEffects.css';

const SegmentEffects = ({ speed, filter, onSpeedChange, onFilterChange }) => {
  return (
    <div className="segment-effects">
      <div className="effect-control">
        <label>Speed</label>
        <select value={speed} onChange={(e) => onSpeedChange(Number(e.target.value))}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
      
      <div className="effect-control">
        <label>Filter</label>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="none">None</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="blur">Blur</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
          <option value="invert">Invert</option>
          <option value="saturate">Saturate</option>
        </select>
      </div>
    </div>
  );
};

export default SegmentEffects;