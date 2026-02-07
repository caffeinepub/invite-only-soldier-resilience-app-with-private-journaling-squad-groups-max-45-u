/**
 * Military Apps Dataset
 * 
 * Offline-first static content for military apps useful to soldiers and families.
 * Includes installation info, benefits access, mental wellness, and quality-of-life tools.
 */

import type { MilitaryApp } from '../../types/militaryApps';

export const militaryApps: MilitaryApp[] = [
  {
    id: 'digital-garrison',
    name: 'Digital Garrison',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'One-stop access to installation resources, base services, and facility info.',
    howToUse: 'Check gate hours, find on-post services (commissary, PX, gym), get installation alerts, and access base maps. Essential for new arrivals and daily life on post.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/digital-garrison/id1234567890' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.army.digitalgarrison' }
    ],
    tags: ['Installation Info']
  },
  {
    id: 'my-military-onesource',
    name: 'My Military OneSource',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Personalized benefits hub and MilLife support for service members and families.',
    howToUse: 'Access personalized benefits info, connect with counselors, find childcare resources, get PCS support, and explore education/career tools. Your go-to for family readiness.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/my-military-onesource/id1234567891' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.militaryonesource.mymilitaryonesource' },
      { platform: 'Website', url: 'https://www.militaryonesource.mil' }
    ],
    tags: ['Benefits', 'Mental Wellness']
  },
  {
    id: 'milprovider',
    name: 'MilProvider',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Quick access to Military OneSource resources and provider directories.',
    howToUse: 'Find TRICARE providers, mental health counselors, legal assistance, and financial advisors. Fast search for vetted support services near you.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/milprovider/id1234567892' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.militaryonesource.milprovider' }
    ],
    tags: ['Benefits', 'Mental Wellness']
  },
  {
    id: 'virtual-hope-box',
    name: 'Virtual Hope Box',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Personalized coping toolkit with photos, quotes, music, and distraction activities.',
    howToUse: 'Build your own digital hope box with meaningful photos, calming music, inspirational quotes, and coping strategies. Use during stress, anxiety, or tough moments to ground yourself.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/virtual-hope-box/id825099621' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.t2.vhb' }
    ],
    tags: ['Mental Wellness']
  },
  {
    id: 'breathe2relax',
    name: 'Breathe2Relax',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Guided diaphragmatic breathing exercises to reduce stress and regulate emotions.',
    howToUse: 'Practice controlled breathing techniques to calm your nervous system before high-stress events, after missions, or anytime you need to reset. Includes visual guides and customizable sessions.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/breathe2relax/id425720246' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=org.t2health.breathe2relax' }
    ],
    tags: ['Mental Wellness']
  },
  {
    id: 'chill-drills',
    name: 'Chill Drills',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Quick stress-relief exercises and relaxation techniques for on-the-go use.',
    howToUse: 'Access short, practical drills (muscle relaxation, visualization, grounding) when you need immediate stress relief. Perfect for field environments or busy schedules.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/chill-drills/id1234567893' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.t2.chilldrills' }
    ],
    tags: ['Mental Wellness']
  },
  {
    id: 'aims-anger-management',
    name: 'AIMS for Anger Management',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Evidence-based anger management tools and self-assessment for service members.',
    howToUse: 'Track anger triggers, learn de-escalation techniques, and practice cognitive strategies to manage anger in healthy ways. Includes self-assessment and progress tracking.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/aims-for-anger-management/id1234567894' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.t2.aims' }
    ],
    tags: ['Mental Wellness']
  },
  {
    id: 'afn-pacific',
    name: 'AFN Pacific',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'News, entertainment, and local info for service members stationed overseas.',
    howToUse: 'Stay connected with AFN radio/TV streams, local base news, community events, and entertainment programming. Essential for overseas assignments to stay informed and entertained.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/afn-pacific/id1234567895' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.afn.pacific' },
      { platform: 'Website', url: 'https://www.afnpacific.net' }
    ],
    tags: ['Overseas Life']
  },
  {
    id: 'hots-and-cots',
    name: 'Hots & Cots',
    iconPath: '/assets/military-apps/app-placeholder.svg',
    oneLine: 'Soldier-driven reviews of barracks, DFACs, and base facilities.',
    howToUse: 'Read honest reviews from fellow soldiers about barracks quality, DFAC food, gyms, and other on-post facilities. Leave your own reviews to help the community make informed decisions.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/hots-cots/id1234567896' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.hotsandcots' },
      { platform: 'Website', url: 'https://www.hotsandcots.com' }
    ],
    tags: ['Installation Info']
  }
];
