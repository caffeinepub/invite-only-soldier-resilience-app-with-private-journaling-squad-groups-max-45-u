/**
 * Military Apps Filter Utility
 * 
 * Performs keyword search and tag filtering over the Military Apps dataset.
 */

import type { MilitaryApp, MilitaryAppTag } from '../types/militaryApps';

export function filterMilitaryApps(
  apps: MilitaryApp[],
  searchQuery: string,
  selectedTag: MilitaryAppTag | null
): MilitaryApp[] {
  let filtered = apps;

  // Filter by tag first
  if (selectedTag) {
    filtered = filtered.filter(app => app.tags.includes(selectedTag));
  }

  // Then filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(app => {
      const searchableText = [
        app.name,
        app.oneLine,
        app.howToUse,
        ...app.tags
      ].join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }

  return filtered;
}
