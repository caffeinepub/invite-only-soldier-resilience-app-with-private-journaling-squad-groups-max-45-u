/**
 * Normalizes invite codes by trimming whitespace only.
 * The backend handles case-insensitive validation.
 */
export function normalizeInviteCode(code: string): string {
  return code.trim();
}
