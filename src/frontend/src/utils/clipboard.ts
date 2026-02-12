/**
 * Clipboard utility with safe browser fallback.
 * Handles environments where navigator.clipboard is unavailable.
 */

export async function copyToClipboard(text: string): Promise<void> {
  // Modern clipboard API (preferred)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      console.warn('Clipboard API failed, falling back to execCommand', err);
    }
  }

  // Fallback for older browsers or insecure contexts
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('execCommand copy failed');
    }
  } finally {
    document.body.removeChild(textArea);
  }
}
