/**
 * Mission Content
 * 
 * Mission-first content structure with gameplay fields (briefing, win conditions,
 * XP reward, scenario steps including timed steps, side quests, unlock rules including
 * assessment-based unlocks) and optional reflection deep-link payloads.
 */

import type { Mission } from '../types/missions';

export const MISSIONS: Mission[] = [
  {
    id: 'mental-readiness-1',
    category: 'Mental Readiness',
    title: 'Building Mental Toughness',
    briefing: 'Mental toughness is the ability to perform under pressure. This mission tests your understanding of stress management and resilience under time constraints.',
    winConditions: [
      { description: 'Score 70% or higher on decision challenges', threshold: 70 },
      { description: 'Complete timed decision within limit' },
    ],
    xpReward: 100,
    steps: [
      {
        type: 'briefing',
        content: 'Mental toughness isn\'t about being fearless—it\'s about acting despite fear.\n\nYou\'ll face three scenarios testing your ability to make sound decisions under stress. One will be timed. Choose wisely.',
      },
      {
        type: 'decision',
        content: 'You\'re leading a team through a high-stress training exercise. One team member is visibly struggling and falling behind. What do you do?',
        choices: [
          {
            id: 'push',
            text: 'Push them harder to keep up',
            outcome: 'May build short-term resilience but risks injury or burnout',
            points: 5,
          },
          {
            id: 'support',
            text: 'Adjust the pace and provide encouragement',
            outcome: 'Builds trust and sustainable performance',
            points: 10,
          },
          {
            id: 'ignore',
            text: 'Focus on the mission and let them catch up',
            outcome: 'Mission-focused but may damage team cohesion',
            points: 3,
          },
        ],
      },
      {
        type: 'scenario',
        content: 'Your plan just fell apart. Equipment failed, timeline compressed, and leadership is watching. How do you respond?',
        choices: [
          {
            id: 'panic',
            text: 'Express frustration and blame the situation',
            outcome: 'Loses team confidence',
            points: 0,
          },
          {
            id: 'adapt',
            text: 'Stay calm, assess options, execute fundamentals',
            outcome: 'Demonstrates composure under pressure',
            points: 10,
          },
          {
            id: 'freeze',
            text: 'Wait for new orders before acting',
            outcome: 'Misses opportunity to lead',
            points: 2,
          },
        ],
      },
      {
        type: 'timed',
        content: 'CONTACT! Enemy spotted 200m ahead. Your team is exposed. You have 15 seconds to decide.',
        timeLimit: 15,
        correctChoice: 'cover',
        choices: [
          {
            id: 'cover',
            text: 'Take cover and assess',
            points: 10,
          },
          {
            id: 'charge',
            text: 'Advance aggressively',
            points: 3,
          },
          {
            id: 'retreat',
            text: 'Fall back immediately',
            points: 5,
          },
        ],
      },
    ],
    sideQuests: [
      {
        id: 'perfect-score',
        description: 'Achieve 100% score on all decisions',
        condition: 'Score 30/30 points',
        reward: { xp: 50, unlockable: 'Mental Toughness Badge' },
      },
    ],
    reflectionPrompt: {
      prefillTitle: 'Mental Toughness in Action',
      prefillContent: 'Reflect on the mission:\n\n1. Which decision was hardest for you?\n2. How did time pressure affect your choices?\n3. What did this reveal about your stress response?\n4. How can you apply this to real situations?',
    },
  },
  {
    id: 'resilience-1',
    category: 'Resilience',
    title: 'Bouncing Back from Setbacks',
    briefing: 'Resilience is the ability to recover from adversity. This mission challenges your response to failure and setback.',
    winConditions: [
      { description: 'Demonstrate growth mindset in responses', threshold: 60 },
    ],
    xpReward: 100,
    steps: [
      {
        type: 'briefing',
        content: 'Setbacks are inevitable. What matters is how you respond.\n\nYou\'ll face scenarios where things go wrong. Your choices will reveal your resilience mindset.',
      },
      {
        type: 'scenario',
        content: 'You failed a critical qualification test. Your peers passed. How do you process this?',
        choices: [
          {
            id: 'blame',
            text: 'The test was unfair or poorly designed',
            outcome: 'External blame prevents growth',
            points: 0,
          },
          {
            id: 'learn',
            text: 'Analyze what went wrong and create a study plan',
            outcome: 'Growth mindset drives improvement',
            points: 10,
          },
          {
            id: 'quit',
            text: 'Maybe this isn\'t for me',
            outcome: 'Fixed mindset limits potential',
            points: 0,
          },
        ],
      },
      {
        type: 'decision',
        content: 'A teammate who failed with you is giving up. What do you do?',
        choices: [
          {
            id: 'support',
            text: 'Share your plan and offer to study together',
            outcome: 'Builds team resilience',
            points: 10,
          },
          {
            id: 'focus',
            text: 'Focus on your own preparation',
            outcome: 'Self-focused but misses leadership opportunity',
            points: 5,
          },
          {
            id: 'agree',
            text: 'Agree that it\'s too hard',
            outcome: 'Reinforces negative mindset',
            points: 0,
          },
        ],
      },
    ],
    reflectionPrompt: {
      prefillTitle: 'Learning from Setbacks',
      prefillContent: 'Reflect on a recent setback:\n\n1. What happened?\n2. What was your initial reaction?\n3. What did you learn?\n4. How did this make you stronger?',
    },
  },
  {
    id: 'decision-making-1',
    category: 'Decision Making',
    title: 'OODA Loop Under Pressure',
    briefing: 'Master rapid decision-making using the OODA loop: Observe, Orient, Decide, Act.',
    winConditions: [
      { description: 'Complete all timed decisions correctly', threshold: 80 },
    ],
    xpReward: 150,
    steps: [
      {
        type: 'briefing',
        content: 'The OODA loop is your framework for rapid decisions:\n\nObserve: Gather information\nOrient: Analyze context\nDecide: Choose action\nAct: Execute\n\nSpeed matters, but so does accuracy.',
      },
      {
        type: 'timed',
        content: 'OBSERVE: You hear gunfire 100m north. Your squad is 50m south of the objective. Radio reports enemy contact at the objective.\n\nWhat do you do?',
        timeLimit: 20,
        correctChoice: 'assess',
        choices: [
          {
            id: 'assess',
            text: 'Halt, assess threat, request sitrep',
            points: 10,
          },
          {
            id: 'continue',
            text: 'Continue to objective as planned',
            points: 3,
          },
          {
            id: 'engage',
            text: 'Move toward gunfire immediately',
            points: 2,
          },
        ],
      },
      {
        type: 'timed',
        content: 'ORIENT: Sitrep confirms 3 enemy fighters at objective. You have 6 soldiers, superior position, but limited ammo.\n\nWhat\'s your priority?',
        timeLimit: 15,
        correctChoice: 'flank',
        choices: [
          {
            id: 'flank',
            text: 'Use position advantage to flank',
            points: 10,
          },
          {
            id: 'suppress',
            text: 'Suppress with heavy fire',
            points: 5,
          },
          {
            id: 'wait',
            text: 'Wait for reinforcements',
            points: 3,
          },
        ],
      },
    ],
    unlockRules: [
      {
        type: 'mission-complete',
        value: 'mental-readiness-1',
        description: 'Complete "Building Mental Toughness" first',
      },
    ],
    sideQuests: [
      {
        id: 'speed-demon',
        description: 'Complete all timed decisions in under 50% of time limit',
        condition: 'Fast and accurate',
        reward: { xp: 75, unlockable: 'Rapid Decision Badge' },
      },
    ],
  },
  {
    id: 'sleep-performance-1',
    category: 'Sleep Performance',
    title: 'Sleep as a Weapon System',
    briefing: 'Sleep is not optional—it\'s a force multiplier. This mission tests your understanding of sleep science and tactical application.',
    winConditions: [
      { description: 'Demonstrate understanding of sleep principles', threshold: 70 },
    ],
    xpReward: 100,
    steps: [
      {
        type: 'briefing',
        content: 'FM 7-22 and sleep science agree: 7-8 hours of quality sleep is non-negotiable for peak performance.\n\nYou\'ll face scenarios testing your sleep discipline and tactical sleep strategies.',
      },
      {
        type: 'decision',
        content: 'It\'s 2200. You have PT at 0530. A buddy invites you to play video games. What do you do?',
        choices: [
          {
            id: 'sleep',
            text: 'Decline and prioritize sleep',
            outcome: 'Discipline equals freedom',
            points: 10,
          },
          {
            id: 'play',
            text: 'Play for an hour, sleep at 2300',
            outcome: 'Compromises sleep window',
            points: 5,
          },
          {
            id: 'binge',
            text: 'Play until midnight, you\'ll be fine',
            outcome: 'Sleep debt accumulates',
            points: 0,
          },
        ],
      },
      {
        type: 'scenario',
        content: 'You\'re on a 72-hour field exercise. Sleep will be limited. How do you prepare?',
        choices: [
          {
            id: 'bank',
            text: 'Bank sleep for 3 nights before (8-9 hours)',
            outcome: 'Proven strategy for sustained ops',
            points: 10,
          },
          {
            id: 'normal',
            text: 'Maintain normal sleep, you\'ll adapt',
            outcome: 'Misses opportunity to prepare',
            points: 3,
          },
          {
            id: 'party',
            text: 'Enjoy free time before the suck',
            outcome: 'Starts exercise already depleted',
            points: 0,
          },
        ],
      },
      {
        type: 'decision',
        content: 'During the exercise, you have a 2-hour break. What\'s your move?',
        choices: [
          {
            id: 'nap',
            text: 'Take a 20-30 minute tactical nap',
            outcome: 'Restores alertness without grogginess',
            points: 10,
          },
          {
            id: 'caffeine',
            text: 'Drink coffee and stay alert',
            outcome: 'Short-term boost, no recovery',
            points: 5,
          },
          {
            id: 'socialize',
            text: 'Hang with the squad',
            outcome: 'Misses recovery opportunity',
            points: 2,
          },
        ],
      },
    ],
    unlockRules: [
      {
        type: 'streak',
        value: 3,
        description: 'Maintain a 3-day readiness streak',
      },
    ],
    reflectionPrompt: {
      prefillTitle: 'My Sleep Performance Assessment',
      prefillContent: 'Assess your sleep habits:\n\n1. Average hours per night (last 7 days): ___\n2. Biggest sleep disruptors: ___\n3. One change I\'ll make this week: ___\n4. How will better sleep improve my performance: ___',
    },
  },
  {
    id: 'adaptive-leadership-1',
    category: 'Leadership',
    title: 'Adaptive Leadership Styles',
    briefing: 'Effective leaders adapt their style to the situation and team member. This mission explores personality-driven leadership approaches.',
    winConditions: [
      { description: 'Demonstrate adaptive leadership understanding', threshold: 70 },
    ],
    xpReward: 150,
    steps: [
      {
        type: 'briefing',
        content: 'One size does not fit all in leadership. Understanding personality types helps you adapt your approach for maximum effectiveness.\n\nYou\'ll face scenarios requiring different leadership styles based on team member traits.',
      },
      {
        type: 'scenario',
        content: 'You have a highly conscientious team member who excels at details but struggles with rapid changes. The mission just pivoted. How do you lead them?',
        choices: [
          {
            id: 'structure',
            text: 'Provide clear structure for the new plan and acknowledge the change',
            outcome: 'Leverages their strength while supporting adaptation',
            points: 10,
          },
          {
            id: 'push',
            text: 'Push them to be more flexible',
            outcome: 'Fights their natural style',
            points: 3,
          },
          {
            id: 'sideline',
            text: 'Assign them to a stable role',
            outcome: 'Misses development opportunity',
            points: 5,
          },
        ],
      },
      {
        type: 'decision',
        content: 'You have an extraverted team member who energizes the group but sometimes dominates discussions. How do you leverage their strength while ensuring all voices are heard?',
        choices: [
          {
            id: 'channel',
            text: 'Channel their energy into facilitating input from others',
            outcome: 'Turns strength into team multiplier',
            points: 10,
          },
          {
            id: 'suppress',
            text: 'Ask them to hold back',
            outcome: 'Wastes their natural talent',
            points: 2,
          },
          {
            id: 'ignore',
            text: 'Let the team self-regulate',
            outcome: 'Abdicates leadership responsibility',
            points: 0,
          },
        ],
      },
    ],
    unlockRules: [
      {
        type: 'assessment',
        value: 'ocean',
        description: 'Complete Big Five (OCEAN) assessment',
      },
    ],
  },
  {
    id: 'resilience-coaching-1',
    category: 'Resilience',
    title: 'Building Team Resilience',
    briefing: 'Resilience is contagious. Learn to recognize stress patterns and coach team members through adversity.',
    winConditions: [
      { description: 'Apply resilience coaching principles', threshold: 70 },
    ],
    xpReward: 150,
    steps: [
      {
        type: 'briefing',
        content: 'As a leader, your resilience sets the tone. But you also need to recognize when team members are struggling and provide effective support.\n\nYou\'ll practice identifying stress signals and applying coaching strategies.',
      },
      {
        type: 'scenario',
        content: 'A team member with typically high resilience is showing signs of stress: withdrawn, irritable, performance declining. What\'s your approach?',
        choices: [
          {
            id: 'connect',
            text: 'Connect privately, normalize stress, assess support needs',
            outcome: 'Creates psychological safety for recovery',
            points: 10,
          },
          {
            id: 'tough',
            text: 'Remind them to stay tough',
            outcome: 'Misses opportunity to support',
            points: 2,
          },
          {
            id: 'wait',
            text: 'Wait for them to ask for help',
            outcome: 'Delays intervention',
            points: 3,
          },
        ],
      },
      {
        type: 'decision',
        content: 'A team member is building resilience but still struggles under pressure. They just made a mistake in a high-stress situation. How do you coach them?',
        choices: [
          {
            id: 'debrief',
            text: 'Debrief the situation, identify learning, practice stress management',
            outcome: 'Builds skills and confidence',
            points: 10,
          },
          {
            id: 'reassign',
            text: 'Reassign them to lower-stress roles',
            outcome: 'Prevents growth',
            points: 2,
          },
          {
            id: 'criticize',
            text: 'Point out the mistake to prevent recurrence',
            outcome: 'Damages confidence without building skills',
            points: 0,
          },
        ],
      },
    ],
    unlockRules: [
      {
        type: 'assessment',
        value: 'gat',
        description: 'Complete Resilience & Emotional Intelligence assessment',
      },
    ],
  },
];

export const CATEGORIES = [
  'Mental Readiness',
  'Resilience',
  'Decision Making',
  'Communication',
  'Team Cohesiveness',
  'Identity & Values',
  'Sleep Performance',
  'Leadership',
];
