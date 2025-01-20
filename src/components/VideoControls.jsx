import React from 'react';
import { FaPlay, FaPause, FaPlus, FaDownload } from 'react-icons/fa';
import '../styles/VideoControls.css';

const VideoControls = ({ isPlaying, onPlayPause, onAddSegment, onDownload, isDownloading }) => {
  return (
    <div className="controls">
      <button onClick={onPlayPause} className="control-btn">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button onClick={onAddSegment} className="add-segment-btn">
        <FaPlus /> <span>Add Segment</span>
      </button>

      <button 
        onClick={onDownload} 
        className="download-btn"
        disabled={isDownloading}
      >
        <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
};

export default VideoControls;