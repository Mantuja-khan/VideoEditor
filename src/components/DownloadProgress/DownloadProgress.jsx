import React, { useState, useEffect } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { formatBytes, calculateSpeed } from '../../utils/downloadUtils';
import './DownloadProgress.css';

const DownloadProgress = ({ progress, totalSize, onClose, startTime }) => {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const percentage = Math.round((progress || 0) * 100);
  const downloadedSize = (totalSize || 0) * (progress || 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const speed = calculateSpeed(downloadedSize, startTime);
      setDownloadSpeed(speed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [downloadedSize, startTime]);

  return (
    <div className="download-overlay">
      <div className="download-modal">
        <div className="download-header">
          <div className="download-title">
            <FaDownload />
            <h3>Downloading Video</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="download-content">
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="download-stats">
            <div className="stat-item">
              <span className="stat-label">Progress</span>
              <span className="stat-value">{percentage}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Speed</span>
              <span className="stat-value">{formatBytes(downloadSpeed)}/s</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Downloaded</span>
              <span className="stat-value">
                {formatBytes(downloadedSize)} / {formatBytes(totalSize || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadProgress;