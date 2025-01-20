import React from 'react';
import SegmentCard from './SegmentCard';
import './SegmentList.css';

const SegmentList = ({ segments, duration, onUpdateSegment }) => {
  if (!segments.length) {
    return (
      <div className="empty-segments">
        <p>No segments added yet. Add a segment to start editing!</p>
      </div>
    );
  }

  return (
    <div className="segments-list">
      {segments.map(segment => (
        <SegmentCard
          key={segment.id}
          segment={segment}
          duration={duration}
          onUpdate={onUpdateSegment}
        />
      ))}
    </div>
  );
};
export default SegmentList;