/**
 * Soldier Connect Type Definitions
 * 
 * All types for the offline-first Soldier Connect community pillar.
 * Content is stored device-locally and scoped to localUuid.
 */

export type ThreadCategory = 
  | 'Mental Performance'
  | 'Sleep'
  | 'Fitness'
  | 'Leadership'
  | 'Rationality'
  | 'Military Life'
  | 'Resilience'
  | 'PT Prep';

export type ChallengeType = 
  | 'PT Challenge'
  | 'Journaling Streak'
  | 'Sleep Goal'
  | 'Mindset Drill';

export type MentorBadge = 
  | 'H2F Mentor'
  | 'NCO Insight'
  | 'Experienced Soldier';

export type ReactionType = 
  | 'Like'
  | 'Motivated'
  | 'Respect'
  | 'Strong Work';

export interface ThreadReply {
  replyId: string;
  threadId: string;
  body: string;
  anonymous: boolean;
  createdAt: number;
  authorId: string;
}

export interface DiscussionThread {
  id: string;
  category: ThreadCategory;
  title: string;
  body: string;
  anonymous: boolean;
  createdAt: number;
  authorId: string;
  replies: ThreadReply[];
  reactions: Record<ReactionType, number>;
  viewCount: number;
}

export interface PeerStory {
  id: string;
  title: string;
  body: string;
  media?: {
    type: 'image' | 'video';
    localRef: string;
  };
  createdAt: number;
  authorId: string;
  reactions: Record<ReactionType, number>;
  viewCount: number;
  isHighlight: boolean;
}

export interface MentorNote {
  id: string;
  mentorBadge: MentorBadge;
  topic: string;
  body: string;
  createdAt: number;
  authorId: string;
  reactions: Record<ReactionType, number>;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  description: string;
  progress: number;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  authorId: string;
}

export interface Reaction {
  id: string;
  postId: string;
  postType: 'thread' | 'reply' | 'story' | 'mentorNote';
  reactionType: ReactionType;
  createdAt: number;
  authorId: string;
}

export interface ModerationFlag {
  id: string;
  contentId: string;
  contentType: 'thread' | 'reply' | 'story' | 'mentorNote';
  reason: string;
  notes?: string;
  createdAt: number;
  reporterId: string;
}

export interface SoldierConnectNotification {
  id: string;
  type: 'reply' | 'weeklyHighlight' | 'mentorNote' | 'challengeReminder';
  title: string;
  body: string;
  linkTo?: string;
  read: boolean;
  createdAt: number;
}

export interface FollowedMentor {
  mentorBadge: MentorBadge;
  followedAt: number;
}

export interface SoldierConnectState {
  threads: DiscussionThread[];
  stories: PeerStory[];
  mentorNotes: MentorNote[];
  challenges: Challenge[];
  reactions: Reaction[];
  flags: ModerationFlag[];
  notifications: SoldierConnectNotification[];
  followedMentors: FollowedMentor[];
}
