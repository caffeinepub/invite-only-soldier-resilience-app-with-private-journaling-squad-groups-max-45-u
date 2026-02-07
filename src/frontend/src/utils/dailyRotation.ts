/**
 * Deterministic daily rotation utility.
 * Maps the current local date to a stable quote index.
 * The same date always returns the same index for a given dataset length.
 */
export function getDailyQuoteIndex(datasetLength: number): number {
  if (datasetLength === 0) return 0;
  
  // Get current date in YYYY-MM-DD format (local timezone)
  const now = new Date();
  const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  // Simple hash of the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Map hash to index in dataset
  return Math.abs(hash) % datasetLength;
}
