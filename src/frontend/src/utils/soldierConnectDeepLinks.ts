/**
 * Soldier Connect Deep Link Helpers
 * 
 * Build navigation targets with prefilled context for cross-pillar integration.
 */

import type { ThreadCategory } from '../types/soldierConnect';

export interface ThreadDeepLinkParams {
  category?: ThreadCategory;
  title?: string;
  body?: string;
  source?: string;
}

export interface StoryDeepLinkParams {
  title?: string;
  body?: string;
  source?: string;
}

export function buildThreadDeepLink(params: ThreadDeepLinkParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.category) searchParams.set('category', params.category);
  if (params.title) searchParams.set('title', params.title);
  if (params.body) searchParams.set('body', params.body);
  if (params.source) searchParams.set('source', params.source);
  
  return `/soldier-connect/discussions?${searchParams.toString()}`;
}

export function buildStoryDeepLink(params: StoryDeepLinkParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.title) searchParams.set('title', params.title);
  if (params.body) searchParams.set('body', params.body);
  if (params.source) searchParams.set('source', params.source);
  
  return `/soldier-connect/stories?${searchParams.toString()}`;
}

export function parseThreadDeepLink(search: string): ThreadDeepLinkParams {
  const params = new URLSearchParams(search);
  
  return {
    category: params.get('category') as ThreadCategory | undefined,
    title: params.get('title') || undefined,
    body: params.get('body') || undefined,
    source: params.get('source') || undefined,
  };
}

export function parseStoryDeepLink(search: string): StoryDeepLinkParams {
  const params = new URLSearchParams(search);
  
  return {
    title: params.get('title') || undefined,
    body: params.get('body') || undefined,
    source: params.get('source') || undefined,
  };
}
