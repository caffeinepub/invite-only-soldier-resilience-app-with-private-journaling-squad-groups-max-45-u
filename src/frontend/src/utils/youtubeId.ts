/**
 * YouTube Video ID Extraction Utility
 * 
 * Shared helper to extract YouTube video IDs from various URL formats
 * and generate fallback search URLs for invalid/missing links.
 */

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
    /youtube\.com\/shorts\/([^&\s]+)/,
    /youtube\.com\/results\?search_query=(.+)/,
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

export function isYouTubeSearchUrl(url: string): boolean {
  return url.includes('youtube.com/results?search_query=');
}

export function generateYouTubeSearchUrl(title: string, category: string): string {
  const query = encodeURIComponent(`${title} ${category} motivational`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

export function isValidYouTubeUrl(url: string): boolean {
  // Accept both direct video URLs and search URLs as valid
  return extractYouTubeId(url) !== null || isYouTubeSearchUrl(url);
}
