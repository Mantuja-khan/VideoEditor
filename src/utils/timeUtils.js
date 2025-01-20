// Format seconds to MM:SS.ms format
export const formatTimeInput = (seconds) => {
  if (typeof seconds !== 'number') return '00:00.0';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 10);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
};

// Parse MM:SS.ms format to seconds
export const parseTimeInput = (timeStr) => {
  const pattern = /^(\d{0,2}):?(\d{0,2})\.?(\d{0,1})$/;
  const match = timeStr.match(pattern);
  
  if (!match) return null;
  
  const [, mins = '0', secs = '0', ms = '0'] = match;
  const totalSeconds = 
    parseInt(mins, 10) * 60 + 
    parseInt(secs, 10) + 
    parseInt(ms, 10) / 10;
    
  return totalSeconds;
};

// Format seconds to MM:SS display format
export const formatTime = (seconds) => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};