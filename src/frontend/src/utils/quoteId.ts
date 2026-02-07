/**
 * Generate a stable, deterministic ID for a quote based on its content.
 * This ensures the same quote always has the same ID across reloads.
 */
export function generateQuoteId(quote: string, author: string): string {
  const combined = `${quote}|${author}`;
  
  // Simple hash function for deterministic IDs
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to positive number and return as string
  return `quote-${Math.abs(hash)}`;
}
