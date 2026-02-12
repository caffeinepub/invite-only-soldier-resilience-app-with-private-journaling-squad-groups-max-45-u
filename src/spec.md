# Specification

## Summary
**Goal:** Publish the app to a stable production URL on the Internet Computer and provide users an in-app link and QR code they can copy/share/download.

**Planned changes:**
- Deploy the current build to the Internet Computer and surface the live production URL in the UI as a user-facing, copyable link.
- Store the production URL in a single configurable place in the frontend (e.g., env/config) and reference it from the UI.
- Add an in-app share surface (e.g., Settings/About) that displays the production URL, supports one-click copy with English success feedback, renders a QR code for the URL, and allows downloading the QR code as an image (PNG).

**User-visible outcome:** Users can open the app via a stable live link, copy the production URL from within the app, view/scan a QR code that points to the same URL, and download the QR code image.
