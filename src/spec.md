# Specification

## Summary
**Goal:** Make the mobile sidebar drawer (below Tailwind `md`, <768px) close immediately on menu selection and never block interaction with the main content after closing.

**Planned changes:**
- Update mobile-only sidebar nav item click handling to close the drawer instantly (before/independent of route navigation completion).
- Ensure the drawer/backdrop do not capture pointer events or block scrolling/taps when the drawer is closed (e.g., conditional render and/or pointer-events handling while closed).
- Add/verify a semi-transparent mobile-only backdrop that appears only when the drawer is open and closes the drawer when tapped outside.
- Keep desktop (>=768px) persistent sidebar behavior and all existing UI/theme, labels, and routes unchanged (including `/mental-performance/life-lessons`).

**User-visible outcome:** On phones, tapping any sidebar menu item closes the drawer immediately and the selected page is fully visible and interactive; tapping outside the open drawer closes it via a semi-transparent backdrop, while desktop behavior remains the same.
