# Specification

## Summary
**Goal:** Extend an existing learning module with new English-language content explaining stress vs. distress (including eustress), plus influencer-inspired insights and a guided reflection prompt that prefills a journal entry.

**Planned changes:**
- Update `frontend/src/content/modules.ts` by adding new `content` items to at least one existing `Module` entry (no new module created), covering definitions, contrasts, and practical examples of stress vs. distress / eustress vs. distress.
- Add paraphrased, attribution-style insights and general summaries inspired by Wim Hof, David Goggins, Shawn Ryan, Joe Rogan, Tom Brady, Michael Jordan, Mike Tyson, and Jocko Willink (no verbatim/copyrighted quotes).
- Add at least one new reflection prompt to the same module’s `prompts` array with `prefillTitle` and `prefillContent` tailored to applying stress-vs-distress concepts and influencer-inspired practices, using structured questions/checklists for action + recovery planning.

**User-visible outcome:** Users see expanded stress vs. distress learning content inside an existing module and can click “Start” on a new prompt to open the Journal page with a prefilled, guided entry template focused on identifying stressors, distinguishing eustress vs. distress, and choosing an action and recovery plan.
