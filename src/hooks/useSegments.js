import { useState, useCallback } from 'react';

export const useSegments = ({ currentTime, videoRef }) => {
  const [segments, setSegments] = useState([]);

  const addSegment = useCallback(() => {
    if (!videoRef.current) return;
    
    const newSegment = {
      id: segments.length + 1,
      startTime: currentTime,
      endTime: Math.min(currentTime + 5, videoRef.current.duration),
      speed: 1,
      filter: 'none'
    };
    setSegments([...segments, newSegment]);
  }, [segments, currentTime, videoRef]);

  const updateSegment = useCallback((updatedSegment) => {
    setSegments(segments.map(segment => 
      segment.id === updatedSegment.id ? updatedSegment : segment
    ));
  }, [segments]);

  return {
    segments,
    addSegment,
    updateSegment
  };
};