export const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 KB';
  const kb = bytes / 1024;
  return `${kb.toFixed(2)} KB`;
};

export const calculateSpeed = (downloadedBytes, startTime) => {
  if (!startTime || !downloadedBytes) return 0;
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  return elapsedSeconds > 0 ? downloadedBytes / elapsedSeconds : 0;
};