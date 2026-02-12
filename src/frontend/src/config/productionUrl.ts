/**
 * Single source of truth for the production URL.
 * Prefers build-time environment variable, falls back to current location.
 */

export function getProductionUrl(): string {
  // Check for build-time environment variable first
  if (import.meta.env.VITE_PRODUCTION_URL) {
    return import.meta.env.VITE_PRODUCTION_URL;
  }

  // Fallback: derive from current location
  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    const portSuffix = port && port !== '80' && port !== '443' ? `:${port}` : '';
    return `${protocol}//${hostname}${portSuffix}`;
  }

  // SSR fallback (shouldn't happen in this app)
  return 'https://wgn6m-hiaaa-aaaaj-acuza-cai.icp0.io';
}
