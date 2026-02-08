# Specification

## Summary
**Goal:** Remove the Motivational Videos / Life Lessons section from the UI while keeping the existing route path stable and non-exposing.

**Planned changes:**
- Remove the Motivational Videos / Life Lessons item from the primary navigation (sidebar/AppShell).
- Remove/decommission the motivational-videos pages, components, hooks, and content so the videos library UI is no longer present anywhere (grid, search, filters, favorites-only toggle, YouTube player dialog).
- Keep the route path `/mental-performance/life-lessons` in the routing configuration, but change its behavior to no longer show the removed section (redirect to an existing Mental Performance page or show a simple English “section removed” message with a clear way to navigate elsewhere).
- Clean up any section-specific persistence/progress logic (e.g., localStorage keys) so it is no longer written, and ensure the app builds without TypeScript errors or runtime console errors due to removed modules.

**User-visible outcome:** The Motivational Videos / Life Lessons section is no longer discoverable or usable in the app; visiting `/mental-performance/life-lessons` no longer shows the videos experience and instead guides the user to an available Mental Performance area.
