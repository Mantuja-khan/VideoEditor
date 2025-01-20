import { useState, useCallback } from 'react';
import { processVideoDownload } from '../utils/videoEffects';

export const useDownload = ({ videoRef, segments, setError }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSize, setDownloadSize] = useState(0);
  const [downloadStartTime, setDownloadStartTime] = useState(null);

  const handleDownload = useCallback(async () => {
    if (!videoRef.current) {
      setError('No video selected');
      return;
    }
    
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadStartTime(Date.now());
    
    try {
      const { blob, totalSize } = await processVideoDownload(
        videoRef.current, 
        segments,
        (progress) => {
          setDownloadProgress(progress);
        }
      );

      setDownloadSize(totalSize);

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited-video.webm';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
      setError('Failed to download the video. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [videoRef, segments, setError]);

  return {
    isDownloading,
    downloadProgress,
    downloadSize,
    downloadStartTime,
    handleDownload
  };
};