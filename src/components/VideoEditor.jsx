import { useState, useRef, useEffect } from 'react';
import VideoControls from './VideoControls';
import VideoProgress from './VideoProgress/VideoProgress';
import SegmentList from './Segment/SegmentList';
import DownloadProgress from './DownloadProgress/DownloadProgress';
import ErrorPopup from './ErrorPopup';
import { applyVideoEffects, processVideoDownload } from '../utils/videoEffects';
import { useVideoHandlers } from '../hooks/useVideoHandlers';
import { useSegments } from '../hooks/useSegments';
import { useDownload } from '../hooks/useDownload';
import '../styles/VideoEditor.css';

const VideoEditor = () => {
  // Video state
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  // Error handling
  const [error, setError] = useState(null);

  // Custom hooks for different functionalities
  const { handleFileUpload, handlePlayPause, handleSeek } = useVideoHandlers({
    videoRef,
    setVideo,
    setIsPlaying,
    setCurrentTime,
    setError
  });

  const { segments, addSegment, updateSegment } = useSegments({
    currentTime,
    videoRef
  });

  const { 
    isDownloading,
    downloadProgress,
    downloadSize,
    downloadStartTime,
    handleDownload
  } = useDownload({
    videoRef,
    segments,
    setError
  });

  // Apply video effects when current time changes
  useEffect(() => {
    if (videoRef.current) {
      const currentSegment = segments.find(segment => 
        currentTime >= segment.startTime && currentTime <= segment.endTime
      );
      applyVideoEffects(videoRef.current, currentSegment);
    }
  }, [currentTime, segments]);

  return (
    <div className="video-editor">
      {error && (
        <ErrorPopup 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}

      <div className="upload-section">
        <label className="upload-btn">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          Upload Video
        </label>
      </div>

      <div className="video-container">
        <video
          ref={videoRef}
          className="main-video"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        />
        {video && (
          <VideoProgress
            currentTime={currentTime}
            duration={videoRef.current?.duration || 0}
            onSeek={handleSeek}
          />
        )}
      </div>

      <VideoControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onAddSegment={addSegment}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

      {isDownloading && (
        <DownloadProgress
          progress={downloadProgress}
          totalSize={downloadSize}
          onClose={() => setIsDownloading(false)}
          startTime={downloadStartTime}
        />
      )}

      <SegmentList
        segments={segments}
        duration={videoRef.current?.duration || 0}
        onUpdateSegment={updateSegment}
      />
    </div>
  );
};

export default VideoEditor;