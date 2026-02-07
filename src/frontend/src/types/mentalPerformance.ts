/**
 * Type definitions for Mental Performance content modules
 */

export type IconToken =
  | 'shield'
  | 'brain'
  | 'moon'
  | 'heart'
  | 'wind'
  | 'target'
  | 'flame'
  | 'anchor'
  | 'compass'
  | 'zap'
  | 'activity'
  | 'book'
  | 'smartphone'
  | 'headphones'
  | 'users'
  | 'map'
  | 'radio'
  | 'dumbbell'
  | 'clipboard';

export type AppTag =
  | 'Mental Health'
  | 'PTSD'
  | 'Sleep'
  | 'Stress Management'
  | 'Mindfulness'
  | 'Anger Management'
  | 'Anxiety'
  | 'Depression'
  | 'Substance Use'
  | 'Leadership'
  | 'Life Skills'
  | 'Wellness'
  | 'Reading'
  | 'Meditation'
  | 'Official Army & Support'
  | 'Fitness & Training'
  | 'Resilience & Mental Health'
  | 'Tactical / Field Tools';

export interface DownloadLink {
  platform: 'App Store' | 'Google Play' | 'Official Site';
  url: string;
}

export interface AppCardContent {
  id: string;
  name: string;
  iconToken: IconToken;
  oneLine: string;
  howToUse: string;
  downloadLinks: DownloadLink[];
  tags: AppTag[];
  featured?: boolean;
}

export interface LibbyGuideStep {
  title: string;
  description: string;
}

export interface LibbyGuide {
  title: string;
  intro: string;
  steps: LibbyGuideStep[];
  tips: string[];
}
