# Specification

## Summary
**Goal:** Update the global registration invite code so users can register using the code "dagger".

**Planned changes:**
- In `backend/main.mo`, change the `globalInviteCode` constant value to `"dagger"`.
- Ensure `acceptInvite(username, "dagger")` succeeds when capacity is not exceeded and the username is unique, while any other code continues to trap with an invalid invite code error.

**User-visible outcome:** Users can enter the invite code "dagger" during registration to access the app (subject to existing capacity and username rules).
