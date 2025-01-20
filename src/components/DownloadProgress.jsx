import React from 'react';
import '../styles/DownloadProgress.css';

const DownloadProgress = ({ progress, totalSize }) => {
  const percentage = Math.round(progress * 100);
  const downloadedSize = (totalSize * progress).toFixed(2);
  const totalSizeMB = totalSize.toFixed(2);

  return (
    <div className="download-progress">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-info">
        <span className="percentage">{percentage}%</span>
        <span className="size">
          {downloadedSize} MB / {totalSizeMB} MB
        </span>
      </div>
    </div>
  );
};

export default DownloadProgress;