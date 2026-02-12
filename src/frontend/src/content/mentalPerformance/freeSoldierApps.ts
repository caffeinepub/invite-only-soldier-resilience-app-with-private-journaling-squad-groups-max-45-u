/**
 * Free Soldier Apps Content Module
 * 
 * Structured, offline-first content for mental health, resilience,
 * and wellness apps available to soldiers at no cost.
 */

import type { AppCardContent, LibbyGuide } from '../../types/mentalPerformance';

export const libbyGuide: LibbyGuide = {
  title: 'Free Books & Audiobooks with Libby (DoD ID)',
  intro: 'Access thousands of free e-books and audiobooks instantly using your DoD ID card through the Libby app.',
  steps: [
    {
      title: 'Download Libby',
      description: 'Install the Libby app from the App Store or Google Play (100% free, no subscription).'
    },
    {
      title: 'Find Your Base Library',
      description: 'Search for your installation library (e.g., "Fort Liberty Library") or use MWR Digital Library for global access.'
    },
    {
      title: 'Sign In with DoD ID',
      description: 'Use your DoD ID number or military email to get a library card instantly—no physical card needed.'
    },
    {
      title: 'Borrow & Read',
      description: 'Browse, borrow, and download books/audiobooks. They auto-return—no late fees, ever.'
    }
  ],
  tips: [
    'Most base libraries offer 10–20 checkouts at once with 21-day lending periods.',
    'Audiobooks work offline—download before missions or field exercises.',
    'Place holds on popular titles; you\'ll get notified when they\'re available.',
    'MWR Digital Library (mwrdigitallibrary.org) works for all service members worldwide.'
  ]
};

export const freeSoldierApps: AppCardContent[] = [
  {
    id: 'libby',
    name: 'Libby',
    iconToken: 'book',
    oneLine: 'Free e-books and audiobooks with your DoD ID—no subscription required.',
    howToUse: 'Download Libby, connect to your base library or MWR Digital Library using your DoD ID, and borrow thousands of titles instantly. Perfect for downtime, commutes, or building leadership and resilience skills.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/libby-by-overdrive/id1076402606' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.overdrive.mobile.android.libby' },
      { platform: 'Official Site', url: 'https://libbyapp.com' }
    ],
    tags: ['Reading', 'Life Skills', 'Leadership', 'Wellness'],
    featured: true
  },
  {
    id: 'military-onesource',
    name: 'My Military OneSource',
    iconToken: 'users',
    oneLine: 'Free confidential counseling, resources, and support for service members and families.',
    howToUse: 'Access 24/7 non-medical counseling, financial advice, legal consultation, and deployment support. All services are free and confidential—no command notification.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/my-military-onesource/id1527801625' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=mil.dod.mc.mymilitaryonesource' },
      { platform: 'Official Site', url: 'https://www.militaryonesource.mil' }
    ],
    tags: ['Official Army & Support', 'Mental Health', 'Life Skills', 'Wellness']
  },
  {
    id: 'army-mobileconnect',
    name: 'Army MobileConnect',
    iconToken: 'smartphone',
    oneLine: 'Official Army app for news, resources, and installation information.',
    howToUse: 'Stay connected with official Army news, access installation directories, and find resources for soldiers and families. Includes emergency contacts and important announcements.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/army-mobileconnect/id1544271575' }
    ],
    tags: ['Official Army & Support', 'Life Skills']
  },
  {
    id: 'digital-garrison',
    name: 'Digital Garrison',
    iconToken: 'map',
    oneLine: 'Installation maps, services, and facility information for Army bases.',
    howToUse: 'Find facilities, services, and resources on your installation. Includes maps, hours of operation, and contact information for MWR, medical, and support services.',
    downloadLinks: [
      { platform: 'Official Site', url: 'https://home.army.mil/imcom/mobile-apps' }
    ],
    tags: ['Official Army & Support', 'Life Skills']
  },
  {
    id: 'dvids-military',
    name: 'DVIDS Military 24/7',
    iconToken: 'radio',
    oneLine: 'Official Defense Visual Information Distribution Service news and media.',
    howToUse: 'Access official military news, photos, and videos from around the world. Stay informed on Army operations, policy updates, and service member stories.',
    downloadLinks: [
      { platform: 'Official Site', url: 'https://www.army.mil/mobile/dvids.html' }
    ],
    tags: ['Official Army & Support']
  },
  {
    id: 'ipps-a-mobile',
    name: 'IPPS-A Mobile',
    iconToken: 'clipboard',
    oneLine: 'Integrated Personnel and Pay System for Army personnel management.',
    howToUse: 'Access your personnel records, pay information, and submit personnel actions on the go. Search for IPPS-A Mobile in the App Store or Google Play.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/search?term=ipps-a' },
      { platform: 'Google Play', url: 'https://play.google.com/store/search?q=ipps-a&c=apps' }
    ],
    tags: ['Official Army & Support', 'Life Skills']
  },
  {
    id: 'military-army-workouts',
    name: 'Military and Army Workouts',
    iconToken: 'dumbbell',
    oneLine: 'Army-specific workout programs and fitness training plans.',
    howToUse: 'Follow structured workout programs designed for military fitness standards. Includes ACFT preparation, combat conditioning, and deployment-ready training plans.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/military-and-army-workouts/id1597735270' }
    ],
    tags: ['Fitness & Training', 'Wellness']
  },
  {
    id: 'army-leader-smart-cards',
    name: 'Army Leader Smart Cards',
    iconToken: 'clipboard',
    oneLine: 'Quick reference cards for Army leaders covering doctrine and procedures.',
    howToUse: 'Access digital smart cards for leadership, training, and tactical operations. Includes quick reference guides for common Army tasks and procedures.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/army-leader-smart-cards/id554523771' }
    ],
    tags: ['Fitness & Training', 'Leadership', 'Life Skills']
  },
  {
    id: 'ptsd-coach',
    name: 'PTSD Coach',
    iconToken: 'shield',
    oneLine: 'Evidence-based tools to manage PTSD symptoms and track progress.',
    howToUse: 'Learn about PTSD, assess your symptoms, and access coping tools for flashbacks, nightmares, and hypervigilance. Track your progress over time and find professional resources.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/ptsd-coach/id430646302' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.ptsd.ptsdcoach' }
    ],
    tags: ['Resilience & Mental Health', 'PTSD', 'Stress Management']
  },
  {
    id: 't2-mood-tracker',
    name: 'T2 Mood Tracker',
    iconToken: 'activity',
    oneLine: 'Track your mood, anxiety, stress, and other mental health indicators.',
    howToUse: 'Monitor daily mood patterns and identify triggers. Track multiple factors including anxiety, stress, sleep quality, and medication adherence. Search for T2 Mood Tracker in the App Store or Google Play.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/search?term=t2+mood+tracker' },
      { platform: 'Google Play', url: 'https://play.google.com/store/search?q=t2+mood+tracker&c=apps' }
    ],
    tags: ['Resilience & Mental Health', 'Mental Health', 'Stress Management']
  },
  {
    id: 'virtual-hope-box',
    name: 'Virtual Hope Box',
    iconToken: 'heart',
    oneLine: 'Personalized coping tools for stress, anxiety, and tough moments.',
    howToUse: 'Build a digital "hope box" with photos, quotes, music, and coping activities. Use it when you need a quick mental reset or reminder of what matters most.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/virtual-hope-box/id825099621' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.t2.vhb' }
    ],
    tags: ['Resilience & Mental Health', 'Mental Health', 'Stress Management', 'Wellness']
  },
  {
    id: 'breathe2relax',
    name: 'Breathe2Relax',
    iconToken: 'wind',
    oneLine: 'Tactical breathing exercises to manage stress and anxiety in real time.',
    howToUse: 'Use diaphragmatic breathing techniques to lower stress, control anxiety, and improve emotional regulation. Perfect for pre-mission prep or high-pressure situations.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/breathe2relax/id425720246' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=org.t2health.breathe2relax' }
    ],
    tags: ['Resilience & Mental Health', 'Stress Management', 'Anxiety', 'Wellness']
  },
  {
    id: 'atak',
    name: 'Android Team Awareness Kit',
    iconToken: 'map',
    oneLine: 'Tactical situational awareness and mapping tool for field operations.',
    howToUse: 'Advanced mapping and situational awareness platform for tactical operations. Provides real-time location sharing, route planning, and mission coordination capabilities.',
    downloadLinks: [
      { platform: 'Official Site', url: 'https://tak.gov/products/atak-server' }
    ],
    tags: ['Tactical / Field Tools']
  },
  {
    id: 'tactical-nav',
    name: 'Tactical NAV',
    iconToken: 'compass',
    oneLine: 'Military-grade navigation and land navigation training tool.',
    howToUse: 'Practice land navigation skills with military grid reference system (MGRS) support, azimuth calculations, and offline mapping. Essential for field training and operations.',
    downloadLinks: [
      { platform: 'Official Site', url: 'https://tacticalnav.com' }
    ],
    tags: ['Tactical / Field Tools', 'Fitness & Training']
  },
  {
    id: 'cbti-coach',
    name: 'CBT-i Coach',
    iconToken: 'moon',
    oneLine: 'Improve sleep quality with cognitive behavioral therapy for insomnia.',
    howToUse: 'Follow structured sleep training, track your sleep patterns, and learn techniques to fall asleep faster and stay asleep longer. Designed for shift workers and high-stress environments.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/cbt-i-coach/id655918660' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.cbticoach' }
    ],
    tags: ['Sleep', 'Mental Health', 'Wellness']
  },
  {
    id: 'mindfulness-coach',
    name: 'Mindfulness Coach',
    iconToken: 'brain',
    oneLine: 'Guided mindfulness exercises to reduce stress and improve focus.',
    howToUse: 'Practice short mindfulness sessions (3–20 minutes) to calm your mind, improve focus, and manage stress. Includes breathing exercises, body scans, and guided meditations.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/mindfulness-coach/id1482425816' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.mindfulnesscoach' }
    ],
    tags: ['Mindfulness', 'Stress Management', 'Mental Health']
  },
  {
    id: 'act-coach',
    name: 'ACT Coach',
    iconToken: 'compass',
    oneLine: 'Acceptance and Commitment Therapy tools for mental flexibility.',
    howToUse: 'Learn to accept difficult thoughts and feelings while staying committed to your values. Includes exercises for defusion, mindfulness, and values-based action.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/act-coach/id1062481917' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.actcoach' }
    ],
    tags: ['Mental Health', 'Stress Management', 'Mindfulness']
  },
  {
    id: 'aims-anger',
    name: 'AIMS for Anger Management',
    iconToken: 'flame',
    oneLine: 'Recognize anger triggers and practice healthy coping strategies.',
    howToUse: 'Track anger episodes, identify patterns, and learn evidence-based techniques to manage anger before it escalates. Includes relaxation exercises and cognitive restructuring tools.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/aims-anger-management/id1067622122' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.aims' }
    ],
    tags: ['Anger Management', 'Mental Health', 'Stress Management']
  },
  {
    id: 'stair-coach',
    name: 'STAIR Coach',
    iconToken: 'anchor',
    oneLine: 'Skills for managing trauma-related emotions and relationships.',
    howToUse: 'Build emotional regulation skills and improve interpersonal relationships after trauma. Includes exercises for identifying feelings, managing distress, and reconnecting with others.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/stair-coach/id1476649473' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.staircoach' }
    ],
    tags: ['Mental Health', 'PTSD', 'Stress Management']
  },
  {
    id: 'cpt-coach',
    name: 'CPT Coach',
    iconToken: 'target',
    oneLine: 'Cognitive Processing Therapy companion for trauma recovery.',
    howToUse: 'Support your CPT therapy sessions with practice assignments, thought records, and progress tracking. Designed to complement professional treatment for PTSD.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/cpt-coach/id1458758098' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.cptcoach' }
    ],
    tags: ['Mental Health', 'PTSD', 'Stress Management']
  },
  {
    id: 'stay-quit-coach',
    name: 'Stay Quit Coach',
    iconToken: 'activity',
    oneLine: 'Evidence-based support to quit smoking and stay tobacco-free.',
    howToUse: 'Set a quit date, track cravings, and access coping tools when urges hit. Includes motivational messages, progress tracking, and relapse prevention strategies.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/stay-quit-coach/id655887656' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobile.stayquitcoach' }
    ],
    tags: ['Substance Use', 'Wellness', 'Life Skills']
  },
  {
    id: 'va-launchpad',
    name: 'VA Launchpad',
    iconToken: 'zap',
    oneLine: 'Quick access to all VA mobile apps and mental health resources.',
    howToUse: 'Central hub for downloading and launching VA apps. Includes direct links to crisis support, health records, and benefits information.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/va-launchpad/id1556714603' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=gov.va.mobilehealth.launchpad' }
    ],
    tags: ['Mental Health', 'Life Skills', 'Wellness']
  },
  {
    id: 'milprovider',
    name: 'MilProvider',
    iconToken: 'smartphone',
    oneLine: 'Find military and VA healthcare providers near you.',
    howToUse: 'Search for mental health providers, medical facilities, and support services by location. Includes contact info, hours, and directions.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/milprovider/id1476706074' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=mil.health.milprovider' }
    ],
    tags: ['Mental Health', 'Life Skills', 'Wellness']
  },
  {
    id: 'sam-anxiety',
    name: 'SAM Self-Help for Anxiety',
    iconToken: 'heart',
    oneLine: 'Track anxiety levels and practice self-help techniques.',
    howToUse: 'Monitor your anxiety, identify triggers, and use evidence-based exercises to manage symptoms. Includes relaxation tools, thought challenges, and social support features.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/sam-self-help-for-anxiety/id666767947' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.uwe.myoxygen' }
    ],
    tags: ['Anxiety', 'Mental Health', 'Stress Management']
  },
  {
    id: 'whats-up',
    name: "What's Up?",
    iconToken: 'brain',
    oneLine: 'CBT and ACT tools for managing depression, anxiety, and stress.',
    howToUse: 'Use cognitive behavioral therapy and acceptance commitment therapy techniques to challenge negative thoughts and improve mood. Includes habit trackers and coping strategies.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/whats-up-a-mental-health-app/id968251160' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.jacksontempra.apps.whatsup' }
    ],
    tags: ['Depression', 'Anxiety', 'Mental Health', 'Stress Management']
  },
  {
    id: 'moodtools',
    name: 'MoodTools / DBT Self-Help',
    iconToken: 'activity',
    oneLine: 'Dialectical Behavior Therapy skills for emotional regulation.',
    howToUse: 'Learn and practice DBT skills for managing intense emotions, improving relationships, and tolerating distress. Includes mood tracking and crisis survival tools.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/moodtools-depression-aid/id1050683467' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.moodtools.moodtools' }
    ],
    tags: ['Depression', 'Mental Health', 'Stress Management']
  },
  {
    id: 'insight-timer',
    name: 'Insight Timer',
    iconToken: 'headphones',
    oneLine: 'Free guided meditations and mindfulness courses (limited free tier).',
    howToUse: 'Access thousands of free guided meditations, music tracks, and talks from meditation teachers. Free tier includes most content; premium unlocks courses and offline downloads.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/insight-timer-meditation-app/id337472899' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.spotlightsix.zentimerlite2' },
      { platform: 'Official Site', url: 'https://insighttimer.com' }
    ],
    tags: ['Meditation', 'Mindfulness', 'Stress Management', 'Wellness']
  },
  {
    id: 'calm',
    name: 'Calm',
    iconToken: 'moon',
    oneLine: 'Sleep stories, meditation, and relaxation (limited free content).',
    howToUse: 'Use free breathing exercises, sleep stories, and select meditations. Premium subscription unlocks full library. Check if your installation offers free access through MWR.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/calm/id571800810' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.calm.android' },
      { platform: 'Official Site', url: 'https://www.calm.com' }
    ],
    tags: ['Meditation', 'Sleep', 'Stress Management', 'Wellness']
  },
  {
    id: 'headspace',
    name: 'Headspace',
    iconToken: 'brain',
    oneLine: 'Guided meditation and mindfulness training (limited free tier).',
    howToUse: 'Start with free basics course and breathing exercises. Premium unlocks full meditation library. Some military installations offer free subscriptions—check with MWR.',
    downloadLinks: [
      { platform: 'App Store', url: 'https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008' },
      { platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.getsomeheadspace.android' },
      { platform: 'Official Site', url: 'https://www.headspace.com' }
    ],
    tags: ['Meditation', 'Mindfulness', 'Sleep', 'Stress Management']
  }
];
