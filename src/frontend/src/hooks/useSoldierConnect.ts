/**
 * Soldier Connect Hook
 * 
 * Manages all Soldier Connect state and operations with device-local persistence.
 */

import { useState, useEffect, useMemo } from 'react';
import { useLocalProfile } from './useLocalProfile';
import { useMissionProgression } from './useMissionProgression';
import type { SoldierConnectState, DiscussionThread, PeerStory, MentorNote, Challenge, ThreadCategory, ChallengeType, MentorBadge, ReactionType, ThreadReply } from '../types/soldierConnect';
import {
  loadSoldierConnectState,
  saveSoldierConnectState,
  addThread,
  addReply,
  addStory,
  addMentorNote,
  addChallenge,
  updateChallengeProgress,
  addReaction,
  addFlag,
  incrementThreadViews,
  incrementStoryViews,
  updateWeeklyHighlight,
  followMentor,
  unfollowMentor,
  markNotificationRead,
  clearAllNotifications,
} from '../utils/soldierConnectStore';
import { createReplyNotification, createWeeklyHighlightNotification, createMentorNoteNotification } from '../utils/soldierConnectNotifications';
import { calculateThreadXP, calculateReplyXP, calculateStoryXP, calculateMentorNoteXP, calculateChallengeXP, calculateReactionXP } from '../utils/soldierConnectXp';

export function useSoldierConnect() {
  const { profile } = useLocalProfile();
  const { progression, grantAdHocXP } = useMissionProgression();
  const [state, setState] = useState<SoldierConnectState>(() => 
    loadSoldierConnectState(profile.localUuid)
  );

  useEffect(() => {
    const loaded = loadSoldierConnectState(profile.localUuid);
    setState(loaded);
  }, [profile.localUuid]);

  const saveState = (newState: SoldierConnectState) => {
    setState(newState);
    saveSoldierConnectState(profile.localUuid, newState);
  };

  // Thread operations
  const createThread = (category: ThreadCategory, title: string, body: string, anonymous: boolean = false) => {
    const newState = { ...state };
    const thread = addThread(newState, {
      category,
      title,
      body,
      anonymous,
      authorId: profile.localUuid,
    });
    saveState(newState);
    grantAdHocXP(calculateThreadXP(), 'soldier-connect-thread');
    return thread;
  };

  const createReply = (threadId: string, body: string, anonymous: boolean = false) => {
    const newState = { ...state };
    const thread = newState.threads.find(t => t.id === threadId);
    if (!thread) return null;
    
    const reply = addReply(newState, threadId, {
      body,
      anonymous,
      authorId: profile.localUuid,
    });
    
    if (reply) {
      createReplyNotification(newState, threadId, thread.title, profile.localUuid, thread.authorId);
      saveState(newState);
      grantAdHocXP(calculateReplyXP(), 'soldier-connect-reply');
    }
    
    return reply;
  };

  const viewThread = (threadId: string) => {
    const newState = { ...state };
    incrementThreadViews(newState, threadId);
    saveState(newState);
  };

  // Story operations
  const createStory = (title: string, body: string, media?: { type: 'image' | 'video'; localRef: string }) => {
    const newState = { ...state };
    const story = addStory(newState, {
      title,
      body,
      media,
      authorId: profile.localUuid,
    });
    saveState(newState);
    grantAdHocXP(calculateStoryXP(false), 'soldier-connect-story');
    return story;
  };

  const viewStory = (storyId: string) => {
    const newState = { ...state };
    incrementStoryViews(newState, storyId);
    saveState(newState);
  };

  const refreshWeeklyHighlight = () => {
    const newState = { ...state };
    const previousHighlight = newState.stories.find(s => s.isHighlight);
    const newHighlight = updateWeeklyHighlight(newState);
    
    // Grant bonus XP if a new highlight was selected
    if (newHighlight && (!previousHighlight || previousHighlight.id !== newHighlight.id)) {
      grantAdHocXP(calculateStoryXP(true) - calculateStoryXP(false), 'soldier-connect-highlight');
    }
    
    createWeeklyHighlightNotification(newState);
    saveState(newState);
  };

  // Mentor operations
  const createMentorNote = (mentorBadge: MentorBadge, topic: string, body: string) => {
    const newState = { ...state };
    const note = addMentorNote(newState, {
      mentorBadge,
      topic,
      body,
      authorId: profile.localUuid,
    });
    createMentorNoteNotification(newState, mentorBadge, topic);
    saveState(newState);
    grantAdHocXP(calculateMentorNoteXP(), 'soldier-connect-mentor');
    return note;
  };

  const toggleFollowMentor = (mentorBadge: MentorBadge) => {
    const newState = { ...state };
    const isFollowing = newState.followedMentors.some(m => m.mentorBadge === mentorBadge);
    
    if (isFollowing) {
      unfollowMentor(newState, mentorBadge);
    } else {
      followMentor(newState, mentorBadge);
    }
    
    saveState(newState);
  };

  // Challenge operations
  const createChallenge = (type: ChallengeType, description: string, progress: number = 0) => {
    const newState = { ...state };
    const challenge = addChallenge(newState, {
      type,
      description,
      progress,
      authorId: profile.localUuid,
    });
    saveState(newState);
    grantAdHocXP(calculateChallengeXP(false), 'soldier-connect-challenge');
    return challenge;
  };

  const updateChallenge = (challengeId: string, progress: number) => {
    const newState = { ...state };
    const challenge = newState.challenges.find(c => c.id === challengeId);
    const wasCompleted = challenge?.completed || false;
    
    updateChallengeProgress(newState, challengeId, progress);
    
    const nowCompleted = newState.challenges.find(c => c.id === challengeId)?.completed || false;
    
    if (!wasCompleted && nowCompleted) {
      grantAdHocXP(calculateChallengeXP(true) - calculateChallengeXP(false), 'soldier-connect-challenge-complete');
    }
    
    saveState(newState);
  };

  // Reaction operations
  const react = (postId: string, postType: 'thread' | 'reply' | 'story' | 'mentorNote', reactionType: ReactionType) => {
    const newState = { ...state };
    addReaction(newState, {
      postId,
      postType,
      reactionType,
      authorId: profile.localUuid,
    });
    saveState(newState);
    grantAdHocXP(calculateReactionXP(), 'soldier-connect-reaction');
  };

  // Moderation operations
  const flagContent = (contentId: string, contentType: 'thread' | 'reply' | 'story' | 'mentorNote', reason: string, notes?: string) => {
    const newState = { ...state };
    addFlag(newState, {
      contentId,
      contentType,
      reason,
      notes,
      reporterId: profile.localUuid,
    });
    saveState(newState);
  };

  // Notification operations
  const markRead = (notificationId: string) => {
    const newState = { ...state };
    markNotificationRead(newState, notificationId);
    saveState(newState);
  };

  const clearNotifications = () => {
    const newState = { ...state };
    clearAllNotifications(newState);
    saveState(newState);
  };

  // Selectors
  const threadsByCategory = useMemo(() => {
    const grouped: Record<ThreadCategory, DiscussionThread[]> = {
      'Mental Performance': [],
      'Sleep': [],
      'Fitness': [],
      'Leadership': [],
      'Rationality': [],
      'Military Life': [],
      'Resilience': [],
      'PT Prep': [],
    };
    
    state.threads.forEach(thread => {
      grouped[thread.category].push(thread);
    });
    
    return grouped;
  }, [state.threads]);

  const highlightedStory = useMemo(() => {
    return state.stories.find(s => s.isHighlight) || null;
  }, [state.stories]);

  const mentorNotesByBadge = useMemo(() => {
    const grouped: Record<MentorBadge, MentorNote[]> = {
      'H2F Mentor': [],
      'NCO Insight': [],
      'Experienced Soldier': [],
    };
    
    state.mentorNotes.forEach(note => {
      grouped[note.mentorBadge].push(note);
    });
    
    return grouped;
  }, [state.mentorNotes]);

  const followedMentorNotes = useMemo(() => {
    const followedBadges = state.followedMentors.map(m => m.mentorBadge);
    return state.mentorNotes.filter(note => followedBadges.includes(note.mentorBadge));
  }, [state.mentorNotes, state.followedMentors]);

  const unreadNotifications = useMemo(() => {
    return state.notifications.filter(n => !n.read);
  }, [state.notifications]);

  return {
    state,
    createThread,
    createReply,
    viewThread,
    createStory,
    viewStory,
    refreshWeeklyHighlight,
    createMentorNote,
    toggleFollowMentor,
    createChallenge,
    updateChallenge,
    react,
    flagContent,
    markRead,
    clearNotifications,
    threadsByCategory,
    highlightedStory,
    mentorNotesByBadge,
    followedMentorNotes,
    unreadNotifications,
  };
}
