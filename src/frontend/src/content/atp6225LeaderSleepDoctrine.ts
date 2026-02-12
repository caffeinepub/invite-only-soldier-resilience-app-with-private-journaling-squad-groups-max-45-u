/**
 * ATP 6-22.5 Leader Sleep Doctrine
 * Static content transcribed from ATP 6-22.5 (2016) – Chapter 2, Section I
 */

export interface DoctrineSection {
  title: string;
  content: string[];
}

export const atp6225Content = {
  title: 'ATP 6-22.5 Leader Sleep Doctrine',
  description:
    'Doctrine-based sleep guidance from ATP 6-22.5 to improve soldier readiness, cognitive performance, and operational endurance.',
  footer: 'Source: ATP 6-22.5 (2016) – Chapter 2, Section I',
  sections: [
    {
      title: 'SECTION 1: Importance of Sleep',
      content: [
        'Sleep is a biological necessity, not a luxury. It is as critical to survival and performance as food, water, and oxygen.',
        'Sleep directly impacts cognitive function, physical performance, emotional regulation, and decision-making ability.',
        'Leaders who prioritize sleep for themselves and their soldiers enhance unit readiness, reduce accidents, and improve mission outcomes.',
        'Chronic sleep deprivation degrades performance more than most leaders realize, often without obvious warning signs.',
        'Sleep is a force multiplier. Well-rested soldiers perform better, learn faster, and recover more quickly from physical and mental stress.',
      ],
    },
    {
      title: 'SECTION 2: Circadian Rhythm & Timing',
      content: [
        'The human body operates on a 24-hour circadian rhythm that regulates sleep-wake cycles, hormone release, and cognitive performance.',
        'Peak alertness typically occurs in mid-morning and early evening, while natural dips occur in the early afternoon and overnight.',
        'Disrupting circadian rhythms (through shift work, irregular schedules, or sleep deprivation) impairs performance and increases health risks.',
        'Light exposure is the primary cue for circadian timing. Morning light advances the rhythm; evening light delays it.',
        'Leaders should plan critical tasks during peak alertness windows and avoid scheduling high-risk operations during circadian low points when possible.',
        'Maintaining consistent sleep-wake schedules, even on weekends, helps stabilize circadian rhythms and improve sleep quality.',
      ],
    },
    {
      title: 'SECTION 3: Sleep Hygiene & Environment',
      content: [
        'Sleep hygiene refers to practices and environmental conditions that promote consistent, quality sleep.',
        'Key environmental factors include darkness, quiet, comfortable temperature (60-67°F ideal), and a comfortable sleep surface.',
        'Pre-sleep routines should avoid stimulants (caffeine within 6 hours of sleep), heavy meals, intense exercise, and bright screens.',
        'Establish a consistent wind-down routine to signal the body that sleep is approaching.',
        'In field environments, leaders should prioritize sleep protection: designate sleep areas, enforce noise discipline, and rotate guard duties fairly.',
        'Even small improvements in sleep environment can yield significant gains in sleep quality and next-day performance.',
      ],
    },
    {
      title: 'SECTION 4: Effects of Sleep Deprivation',
      content: [
        'Sleep deprivation impairs cognitive performance similarly to alcohol intoxication. After 17 hours awake, performance equals a 0.05% blood alcohol level.',
        'Key impairments include: slowed reaction time, reduced situational awareness, impaired judgment, decreased creativity, and increased risk-taking.',
        'Physical effects include reduced strength, endurance, and coordination, plus increased injury risk and slower recovery.',
        'Emotional regulation suffers: irritability increases, stress tolerance decreases, and interpersonal conflicts rise.',
        'Microsleeps (brief, involuntary sleep episodes) become more frequent and dangerous, especially during monotonous tasks or operations.',
        'Sleep debt accumulates over time. One night of recovery sleep does not fully restore performance after multiple nights of deprivation.',
        'Leaders must recognize that sleep-deprived soldiers may not realize their own impairment—self-assessment becomes unreliable.',
      ],
    },
    {
      title: 'SECTION 5: Leader Application',
      content: [
        'Leaders must model good sleep practices. Soldiers will not prioritize sleep if their leaders do not.',
        'Plan operations to allow for adequate sleep whenever possible. The minimum target is 7 hours per night; 8 hours is optimal.',
        'When sustained operations require sleep restriction, use tactical naps (20-30 minutes) to maintain performance.',
        'Implement sleep plans during training and operations: designate sleep shifts, enforce sleep discipline, and protect sleep time.',
        'Educate soldiers on sleep science and practical techniques. Knowledge empowers self-management and reduces stigma.',
        'Monitor unit performance indicators that correlate with sleep deprivation: accidents, injuries, disciplinary issues, and mission errors.',
        'During extended operations, prioritize sleep for soldiers in high-risk or cognitively demanding roles (drivers, gunners, leaders).',
        'After high-tempo operations, build in recovery time. Sleep debt must be repaid to restore full readiness.',
        'Integrate sleep considerations into mission planning, risk assessments, and after-action reviews.',
        'Remember: fatigue degrades performance predictably. Leaders who ignore sleep science put missions and soldiers at risk.',
      ],
    },
  ] as DoctrineSection[],
};
