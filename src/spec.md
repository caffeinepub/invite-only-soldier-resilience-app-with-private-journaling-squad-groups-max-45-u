# Specification

## Summary
**Goal:** Fix the app getting stuck or failing to load after Internet Identity sign-in by making actor initialization and post-login profile loading resilient, and enabling normal user self-registration/onboarding.

**Planned changes:**
- Update authenticated frontend initialization so actor creation does not block or crash when access-control bootstrap with an admin secret fails; proceed with a usable authenticated actor and only surface an error when it blocks core user flows.
- Update backend authorization logic to support open registration: `getCallerUserProfile` returns `null` for authenticated-but-unregistered users, and `registerUser` self-assigns the `#user` role without using an admin-only path that can trap.
- Add a clear post-login error state in the UI for initial authenticated calls (e.g., loading current user profile), including an English error message and a retry action, instead of an indefinite spinner.

**User-visible outcome:** After signing in with Internet Identity, the app loads reliably (no stuck loading screen). New users can reach onboarding, register successfully, and enter the main app; if an initial profile/auth call fails, the app shows a clear error message with a retry option.
