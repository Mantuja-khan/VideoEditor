import { createOffscreenCanvas, applyCanvasFilter } from './canvasUtils';

export const getFilterStyle = (filterName) => {
  const filters = {
    none: '',
    grayscale: 'grayscale(100%)',
    sepia: 'sepia(100%)',
    blur: 'blur(3px)',
    brightness: 'brightness(130%)',
    contrast: 'contrast(150%)',
    invert: 'invert(100%)',
    saturate: 'saturate(200%)'
  };
  return filters[filterName] || '';
};

export const applyVideoEffects = (video, segment) => {
  if (!video) return;
  
  if (segment) {
    video.style.filter = getFilterStyle(segment.filter);
    video.playbackRate = segment.speed;
  } else {
    video.style.filter = '';
    video.playbackRate = 1;
  }
};

export const processVideoDownload = async (videoElement, segments, onProgress) => {
  if (!videoElement || !segments.length) return null;

  // Create canvas with video dimensions
  const canvas = createOffscreenCanvas(
    videoElement.videoWidth,
    videoElement.videoHeight
  );
  const ctx = canvas.getContext('2d');

  // Create a stream from the canvas
  const stream = canvas.captureStream();
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp9'
  });

  const chunks = [];
  let totalSize = 0;
  let animationFrameId;
  
  // Function to draw current frame with effects
  const drawFrame = () => {
    const currentSegment = segments.find(segment => 
      videoElement.currentTime >= segment.startTime && 
      videoElement.currentTime <= segment.endTime
    );

    ctx.save();
    if (currentSegment) {
      applyCanvasFilter(ctx, currentSegment.filter);
    } else {
      ctx.filter = 'none';
    }
    
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    animationFrameId = requestAnimationFrame(drawFrame);
  };

  return new Promise((resolve) => {
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
      const currentSize = chunks.reduce((acc, chunk) => acc + chunk.size, 0);
      totalSize = currentSize / (1024 * 1024); // Convert to MB
      
      const progress = videoElement.currentTime / videoElement.duration;
      onProgress(progress);
    };
    
    mediaRecorder.onstop = () => {
      cancelAnimationFrame(animationFrameId);
      const blob = new Blob(chunks, { type: 'video/webm' });
      resolve({ blob, totalSize });
    };

    // Start the recording process
    mediaRecorder.start(100);
    videoElement.currentTime = 0;
    videoElement.play();
    drawFrame();

    // Stop when video ends
    videoElement.onended = () => {
      mediaRecorder.stop();
      videoElement.pause();
      onProgress(1);
    };
  });
};