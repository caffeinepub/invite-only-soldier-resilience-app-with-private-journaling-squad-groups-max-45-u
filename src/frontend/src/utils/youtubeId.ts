/**
 * YouTube Video ID Extraction Utility
 * 
 * Shared helper to extract YouTube video IDs from various URL formats.
 * Used by both the player dialog and dataset validation.
 */

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      // Clean up any trailing characters
      return match[1].split('?')[0].split('&')[0];
    }
  }
  return null;
}
