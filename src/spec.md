# Specification

## Summary
**Goal:** Fix sidebar/drawer and overlay event handling so main content and sidebar dropdowns remain reliably clickable on mobile and desktop.

**Planned changes:**
- Audit `AppShell` layout wrappers/overlays to ensure no hidden/persistent backdrop or transparent layer intercepts pointer events when the mobile drawer is closed.
- Adjust sidebar + main content structure to keep them as sibling regions and ensure dropdown menu surfaces (e.g., account dropdown) render above other layers (z-index) without being clipped by parent overflow.
- Update mobile drawer/backdrop interactions so the backdrop only exists while open, backdrop clicks close the drawer, and clicks inside the drawer do not bubble to the backdrop close handler.

**User-visible outcome:** When the mobile drawer is closed, all main content interactions (including Life Lessons cards, filters, and dialogs) work normally; when open, the backdrop closes the drawer reliably without interfering with drawer interactions; sidebar dropdown menus appear above other UI and remain clickable.
