/**
 * Soldier Connect Notification Helpers
 * 
 * Generate local notifications for Soldier Connect events.
 */

import type { SoldierConnectState, SoldierConnectNotification } from '../types/soldierConnect';
import { addNotification } from './soldierConnectStore';

export function createReplyNotification(
  state: SoldierConnectState,
  threadId: string,
  threadTitle: string,
  replyAuthorId: string,
  threadAuthorId: string
): void {
  // Only notify if someone else replied to your thread
  if (replyAuthorId === threadAuthorId) return;
  
  addNotification(state, {
    type: 'reply',
    title: 'New Reply',
    body: `Someone replied to your thread: "${threadTitle}"`,
    linkTo: `/soldier-connect/discussions/${threadId}`,
  });
}

export function createWeeklyHighlightNotification(state: SoldierConnectState): void {
  const lastWeeklyNotification = state.notifications
    .filter(n => n.type === 'weeklyHighlight')
    .sort((a, b) => b.createdAt - a.createdAt)[0];
  
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  
  // Only create if no weekly notification in the last 7 days
  if (!lastWeeklyNotification || lastWeeklyNotification.createdAt < oneWeekAgo) {
    addNotification(state, {
      type: 'weeklyHighlight',
      title: 'Weekly Highlights',
      body: 'Check out this week\'s top soldier stories and contributions',
      linkTo: '/soldier-connect/stories',
    });
  }
}

export function createMentorNoteNotification(state: SoldierConnectState, mentorBadge: string, topic: string): void {
  addNotification(state, {
    type: 'mentorNote',
    title: 'New Mentor Insight',
    body: `${mentorBadge} shared insights on: ${topic}`,
    linkTo: '/soldier-connect/mentorship',
  });
}

export function createChallengeReminderNotification(state: SoldierConnectState, challengeDescription: string): void {
  addNotification(state, {
    type: 'challengeReminder',
    title: 'Challenge Progress',
    body: `Keep pushing on: ${challengeDescription}`,
    linkTo: '/soldier-connect/challenges',
  });
}
