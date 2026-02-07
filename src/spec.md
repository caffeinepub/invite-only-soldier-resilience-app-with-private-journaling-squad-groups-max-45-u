# Specification

## Summary
**Goal:** Replace the permanent left sidebar with a mobile-first, collapsible overlay drawer opened from a hamburger icon in a persistent header.

**Planned changes:**
- Update the global AppShell layout to add a persistent header/top bar with a top-left hamburger menu icon.
- Replace the always-visible left sidebar with a drawer that is hidden by default at all screen sizes and opens as a left-side overlay.
- Implement drawer behaviors: slide-in animation, full-width on mobile, semi-transparent scrim that closes the drawer on tap/click, close (X) control inside the drawer, and auto-close on navigation item selection.
- Ensure main content uses full width when the drawer is closed, and confirm overlay layering/scroll behavior avoids overlap/click-through issues while preserving existing routing (including the unchanged Life Lessons route at `/mental-performance/life-lessons`).

**User-visible outcome:** Users see a persistent top bar with a hamburger icon; tapping it opens a full-width (on mobile) navigation drawer with a scrim, and selecting a destination navigates and closes the drawer while the main content stays full-width when the drawer is closed.
