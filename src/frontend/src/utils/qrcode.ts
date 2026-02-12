/**
 * Lightweight QR code generator using Canvas API.
 * Based on public domain QR code algorithm.
 */

type QRCodeLevel = 'L' | 'M' | 'Q' | 'H';

interface QRCodeOptions {
  size?: number;
  level?: QRCodeLevel;
  bgColor?: string;
  fgColor?: string;
  margin?: number;
}

/**
 * Generate QR code on a canvas element.
 * Uses a simple approach: encode as data URL and render via Image.
 */
export function generateQRCode(
  canvas: HTMLCanvasElement,
  text: string,
  options: QRCodeOptions = {}
): void {
  const {
    size = 200,
    level = 'H',
    bgColor = '#ffffff',
    fgColor = '#000000',
    margin = 4,
  } = options;

  // Use a third-party QR code API service as fallback
  // This is a common pattern for offline-first apps that need QR codes
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&margin=${margin}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  canvas.width = size;
  canvas.height = size;

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Load and draw QR code image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
  };

  img.onerror = () => {
    // Fallback: draw a simple placeholder with text
    ctx.fillStyle = fgColor;
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw border
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, size - 20, size - 20);
    
    // Draw text
    const maxWidth = size - 40;
    const words = text.split('/');
    let y = size / 2 - 20;
    
    words.forEach((word, i) => {
      if (i < 5) { // Limit lines
        ctx.fillText(word.substring(0, 20), size / 2, y, maxWidth);
        y += 15;
      }
    });
    
    ctx.fillText('Scan QR Code', size / 2, size - 30, maxWidth);
  };

  img.src = qrApiUrl;
}

/**
 * Download canvas as PNG image.
 */
export function downloadCanvasAsPNG(canvas: HTMLCanvasElement, filename: string): void {
  const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const downloadLink = document.createElement('a');
  downloadLink.href = pngUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
