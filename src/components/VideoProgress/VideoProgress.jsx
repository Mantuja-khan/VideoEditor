import React, { useRef, useState } from 'react';
import './VideoProgress.css';
import { formatTime } from '../../utils/timeUtils';

const VideoProgress = ({ currentTime, duration, onSeek }) => {
  const progressRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const progress = (currentTime / duration) * 100;
  
  const calculateSeekTime = (clientX) => {
    const rect = progressRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    return percentage * duration;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const seekTime = calculateSeekTime(e.clientX);
    onSeek(seekTime);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const seekTime = calculateSeekTime(e.clientX);
      onSeek(seekTime);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="video-progress">
      <div 
        ref={progressRef}
        className="progress-track" 
        onMouseDown={handleMouseDown}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <div className="progress-handle" />
        </div>
      </div>
      <div className="time-display">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
export default VideoProgress;