import { useCallback } from 'react';

export const useVideoHandlers = ({
  videoRef,
  setVideo,
  setIsPlaying,
  setCurrentTime,
  setError
}) => {
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
      }
    }
  }, [videoRef, setVideo]);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) {
      setError('Please select a video first');
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [videoRef, setIsPlaying, setError]);

  const handleSeek = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, [videoRef, setCurrentTime]);

  return {
    handleFileUpload,
    handlePlayPause,
    handleSeek
  };
};