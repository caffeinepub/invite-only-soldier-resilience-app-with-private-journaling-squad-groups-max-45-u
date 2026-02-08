# Specification

## Summary
**Goal:** Improve the mobile experience by optimizing the AppShell layout, adding a fully hideable sidebar on small screens, fixing the Life Lessons filter/menu overlay issue, and renaming the Life Lessons label in the UI without changing its route.

**Planned changes:**
- Improve responsive layout, spacing, and touch-target sizing across the AppShell (sidebar + main content) for screens <= 768px to avoid overflow and improve usability.
- Add a mobile mode where the sidebar can be fully hidden (off-canvas/0-width) and toggled via a visible menu button, with an obvious way to close/dismiss it; preserve current desktop/tablet behavior.
- On the Life Lessons page, move the filter controls (favorites + category buttons) to the top so they do not overlap/cover the videos list while scrolling (as shown in IMG_2564.png / IMG_2564-1.png).
- Rename the user-facing “Life Lessons” label everywhere it appears in the UI (page title and sidebar label) while keeping the existing route path `/mental-performance/life-lessons` unchanged.

**User-visible outcome:** On mobile, navigation and content are easier to use with no horizontal scrolling, the sidebar can be fully hidden and opened/closed via a menu button, Life Lessons filters no longer cover video cards, and the “Life Lessons” section displays the new name while the URL stays the same.
