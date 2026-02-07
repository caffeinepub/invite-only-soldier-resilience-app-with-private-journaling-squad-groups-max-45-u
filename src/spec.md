# Specification

## Summary
**Goal:** Replace all “Coming Soon” placeholder motivational videos with real, playable YouTube links and matching thumbnails.

**Planned changes:**
- In `frontend/src/content/mentalPerformance/motivationalLifeLessonsVideos.ts`, find every `MotivationalVideo` whose `youtubeUrl` contains `placeholder` and replace it with the correct real YouTube URL for that video.
- For each updated entry, set `thumbnailUrl` to `https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg` using the same video ID from the updated `youtubeUrl`.
- Keep all existing `id` values and category tags unchanged; only replace placeholder URLs so playback is no longer blocked.

**User-visible outcome:** On the Motivational Life Lessons page, no cards show the “Coming Soon” overlay, and every video opens and plays successfully in the embedded player with a correct thumbnail.
