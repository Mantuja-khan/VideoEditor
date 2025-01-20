// Canvas utility functions for video processing
export const createOffscreenCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const applyCanvasFilter = (ctx, filter) => {
  switch (filter) {
    case 'grayscale':
      ctx.filter = 'grayscale(100%)';
      break;
    case 'sepia':
      ctx.filter = 'sepia(100%)';
      break;
    case 'blur':
      ctx.filter = 'blur(3px)';
      break;
    case 'brightness':
      ctx.filter = 'brightness(130%)';
      break;
    case 'contrast':
      ctx.filter = 'contrast(150%)';
      break;
    case 'invert':
      ctx.filter = 'invert(100%)';
      break;
    case 'saturate':
      ctx.filter = 'saturate(200%)';
      break;
    default:
      ctx.filter = 'none';
  }
};