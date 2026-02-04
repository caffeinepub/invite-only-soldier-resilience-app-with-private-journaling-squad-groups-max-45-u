# Specification

## Summary
**Goal:** Build an invite-only, non-affiliated soldier resilience app with private journaling, squad groups, doctrine-informed modules, and community reporting—authenticated via Internet Identity.

**Planned changes:**
- Add Internet Identity sign-in with onboarding that requires a unique (case-insensitive) chosen username and acknowledgement of the non-affiliation disclaimer + community guidelines (stored and re-viewable in Settings/About).
- Implement an explicit non-affiliation disclaimer visible both pre-login (landing/login) and post-login (About/Disclaimer).
- Enforce invite-only registration with backend validation of invite codes and a hard cap of 45 total registered users (backend-enforced, with clear frontend errors).
- Build private journaling with full CRUD for the author; entries are private by default and can be explicitly shared/unshared to a squad group (shared entries viewable read-only by group members only).
- Implement invite-only squad groups (max 45 members): create group, join by invite code, rotate invite code, leave group, owner remove member, and view member list with usernames (backend-enforced limits).
- Add a Content/Modules area with categories for mental readiness, resilience, decision-making, communication, team cohesiveness, and identity/Army values in daily life; each module supports (a) quote/summarize with citation fields and (b) interpreted exercises/reflections; include prompts that prefill a new journal entry.
- Add community guidelines access pre- and post-login, plus reporting for group-shared content (report entry or user with reason + optional details) and an admin/moderator review UI to view and close reports with internal notes.
- Apply a coherent, non-military-agency-branded visual theme across the app (avoid blue/purple as primary colors) and clearly distinguish private journaling vs shared group areas through visual hierarchy.

**User-visible outcome:** Users can sign in with Internet Identity, complete invite-only onboarding (username + acknowledgements), privately journal with optional squad sharing, join/manage invite-only squads up to 45 members, browse doctrine-/team-informed modules that generate journal prompts, view guidelines/disclaimer anytime, and report shared content for admin review.
