/**
 * Type definitions for Military Apps dataset
 */

export type MilitaryAppTag = 
  | 'Installation Info'
  | 'Benefits'
  | 'Mental Wellness'
  | 'Overseas Life';

export interface MilitaryAppDownloadLink {
  platform: 'App Store' | 'Google Play' | 'Website';
  url: string;
}

export interface MilitaryApp {
  id: string;
  name: string;
  iconPath: string; // Path to official logo or placeholder
  oneLine: string; // One-line description
  howToUse: string; // Practical use case for soldiers
  downloadLinks: MilitaryAppDownloadLink[];
  tags: MilitaryAppTag[];
}
