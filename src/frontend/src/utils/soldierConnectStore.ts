/**
 * Soldier Connect Local Storage Utility
 * 
 * Manages device-local persistence for all Soldier Connect content.
 * All data is scoped by localUuid and stored in localStorage.
 */

import type { SoldierConnectState, DiscussionThread, PeerStory, MentorNote, Challenge, Reaction, ModerationFlag, SoldierConnectNotification, FollowedMentor, ThreadReply } from '../types/soldierConnect';

const STORAGE_KEY_PREFIX = 'dagger-soldier-connect-';

function getStorageKey(localUuid: string): string {
  return `${STORAGE_KEY_PREFIX}${localUuid}`;
}

function getEmptyState(): SoldierConnectState {
  return {
    threads: [],
    stories: [],
    mentorNotes: [],
    challenges: [],
    reactions: [],
    flags: [],
    notifications: [],
    followedMentors: [],
  };
}

export function loadSoldierConnectState(localUuid: string): SoldierConnectState {
  if (typeof window === 'undefined') return getEmptyState();
  
  try {
    const stored = localStorage.getItem(getStorageKey(localUuid));
    return stored ? JSON.parse(stored) : getEmptyState();
  } catch (error) {
    console.error('Failed to load Soldier Connect state:', error);
    return getEmptyState();
  }
}

export function saveSoldierConnectState(localUuid: string, state: SoldierConnectState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getStorageKey(localUuid), JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save Soldier Connect state:', error);
  }
}

// Thread operations
export function addThread(state: SoldierConnectState, thread: Omit<DiscussionThread, 'id' | 'createdAt' | 'replies' | 'reactions' | 'viewCount'>): DiscussionThread {
  const newThread: DiscussionThread = {
    ...thread,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    replies: [],
    reactions: { Like: 0, Motivated: 0, Respect: 0, 'Strong Work': 0 },
    viewCount: 0,
  };
  state.threads.push(newThread);
  return newThread;
}

export function addReply(state: SoldierConnectState, threadId: string, reply: Omit<ThreadReply, 'replyId' | 'createdAt' | 'threadId'>): ThreadReply | null {
  const thread = state.threads.find(t => t.id === threadId);
  if (!thread) return null;
  
  const newReply: ThreadReply = {
    ...reply,
    replyId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    threadId,
    createdAt: Date.now(),
  };
  thread.replies.push(newReply);
  return newReply;
}

export function incrementThreadViews(state: SoldierConnectState, threadId: string): void {
  const thread = state.threads.find(t => t.id === threadId);
  if (thread) {
    thread.viewCount += 1;
  }
}

// Story operations
export function addStory(state: SoldierConnectState, story: Omit<PeerStory, 'id' | 'createdAt' | 'reactions' | 'viewCount' | 'isHighlight'>): PeerStory {
  const newStory: PeerStory = {
    ...story,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    reactions: { Like: 0, Motivated: 0, Respect: 0, 'Strong Work': 0 },
    viewCount: 0,
    isHighlight: false,
  };
  state.stories.push(newStory);
  return newStory;
}

export function incrementStoryViews(state: SoldierConnectState, storyId: string): void {
  const story = state.stories.find(s => s.id === storyId);
  if (story) {
    story.viewCount += 1;
  }
}

export function updateWeeklyHighlight(state: SoldierConnectState): PeerStory | null {
  // Clear previous highlights
  state.stories.forEach(s => s.isHighlight = false);
  
  // Select story with highest engagement (reactions + views)
  if (state.stories.length === 0) return null;
  
  const scored = state.stories.map(story => {
    const reactionCount = Object.values(story.reactions).reduce((sum, count) => sum + count, 0);
    const engagementScore = reactionCount + story.viewCount;
    return { story, score: engagementScore };
  });
  
  scored.sort((a, b) => b.score - a.score);
  
  if (scored.length > 0) {
    scored[0].story.isHighlight = true;
    return scored[0].story;
  }
  
  return null;
}

// Mentor note operations
export function addMentorNote(state: SoldierConnectState, note: Omit<MentorNote, 'id' | 'createdAt' | 'reactions'>): MentorNote {
  const newNote: MentorNote = {
    ...note,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    reactions: { Like: 0, Motivated: 0, Respect: 0, 'Strong Work': 0 },
  };
  state.mentorNotes.push(newNote);
  return newNote;
}

// Challenge operations
export function addChallenge(state: SoldierConnectState, challenge: Omit<Challenge, 'id' | 'createdAt' | 'completed'>): Challenge {
  const newChallenge: Challenge = {
    ...challenge,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    completed: false,
  };
  state.challenges.push(newChallenge);
  return newChallenge;
}

export function updateChallengeProgress(state: SoldierConnectState, challengeId: string, progress: number): void {
  const challenge = state.challenges.find(c => c.id === challengeId);
  if (challenge) {
    challenge.progress = Math.min(100, Math.max(0, progress));
    if (challenge.progress >= 100 && !challenge.completed) {
      challenge.completed = true;
      challenge.completedAt = Date.now();
    }
  }
}

// Reaction operations
export function addReaction(state: SoldierConnectState, reaction: Omit<Reaction, 'id' | 'createdAt'>): Reaction {
  // Check if user already reacted to this post
  const existing = state.reactions.find(
    r => r.postId === reaction.postId && r.authorId === reaction.authorId
  );
  
  if (existing) {
    // Update existing reaction
    existing.reactionType = reaction.reactionType;
    return existing;
  }
  
  const newReaction: Reaction = {
    ...reaction,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
  };
  state.reactions.push(newReaction);
  
  // Update reaction counts on the target post
  updateReactionCounts(state, reaction.postId, reaction.postType);
  
  return newReaction;
}

function updateReactionCounts(state: SoldierConnectState, postId: string, postType: string): void {
  const reactions = state.reactions.filter(r => r.postId === postId);
  const counts = { Like: 0, Motivated: 0, Respect: 0, 'Strong Work': 0 };
  
  reactions.forEach(r => {
    counts[r.reactionType] = (counts[r.reactionType] || 0) + 1;
  });
  
  if (postType === 'thread') {
    const thread = state.threads.find(t => t.id === postId);
    if (thread) thread.reactions = counts;
  } else if (postType === 'story') {
    const story = state.stories.find(s => s.id === postId);
    if (story) story.reactions = counts;
  } else if (postType === 'mentorNote') {
    const note = state.mentorNotes.find(n => n.id === postId);
    if (note) note.reactions = counts;
  }
}

// Moderation operations
export function addFlag(state: SoldierConnectState, flag: Omit<ModerationFlag, 'id' | 'createdAt'>): ModerationFlag {
  const newFlag: ModerationFlag = {
    ...flag,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
  };
  state.flags.push(newFlag);
  return newFlag;
}

// Notification operations
export function addNotification(state: SoldierConnectState, notification: Omit<SoldierConnectNotification, 'id' | 'createdAt' | 'read'>): SoldierConnectNotification {
  const newNotification: SoldierConnectNotification = {
    ...notification,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
    read: false,
  };
  state.notifications.push(newNotification);
  return newNotification;
}

export function markNotificationRead(state: SoldierConnectState, notificationId: string): void {
  const notification = state.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
}

export function clearAllNotifications(state: SoldierConnectState): void {
  state.notifications = [];
}

// Follow mentor operations
export function followMentor(state: SoldierConnectState, mentorBadge: string): void {
  const existing = state.followedMentors.find(m => m.mentorBadge === mentorBadge);
  if (!existing) {
    state.followedMentors.push({
      mentorBadge: mentorBadge as any,
      followedAt: Date.now(),
    });
  }
}

export function unfollowMentor(state: SoldierConnectState, mentorBadge: string): void {
  state.followedMentors = state.followedMentors.filter(m => m.mentorBadge !== mentorBadge);
}
