# Specification

## Summary
**Goal:** Fix global invite code validation so users can complete onboarding and preview the app.

**Planned changes:**
- Backend: Normalize the invite code in `acceptInvite(username, inviteCode)` in `backend/main.mo` (trim whitespace and compare case-insensitively) against a similarly-normalized canonical global invite code ("Dagger"), while still rejecting incorrect codes with the existing "Invalid invite code" trap/message.
- Frontend: In `frontend/src/components/onboarding/OnboardingFlow.tsx`, trim the invite code before submitting to `acceptInvite` and add concise helper text stating the invite code is not case-sensitive (keeping the existing English invalid-invite error message unchanged).

**User-visible outcome:** Users can register successfully using the global invite code "Dagger" regardless of capitalization and with accidental leading/trailing spaces, and they see clear guidance that the invite code is not case-sensitive.
