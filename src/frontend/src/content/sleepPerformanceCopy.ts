export const sleepPerformanceCopy = {
  // Dashboard insights
  dashboardTitle: 'Sleep Performance',
  dashboardSubtitle: 'Cognitive sharpness, physical durability, and mission readiness',
  
  // Microcopy (10+ distinct items)
  debtExplainer: 'Sleep debt accumulates when actual sleep falls short of optimal. Each hour of deficit degrades performance.',
  cognitiveImpact: 'Cognitive readiness reflects decision-making speed, situational awareness, and problem-solving capacity.',
  injuryWarning: 'Elevated injury risk indicates increased vulnerability to musculoskeletal damage during physical training.',
  emotionalNote: 'Emotional regulation affects stress response, team dynamics, and judgment under pressure.',
  streakMotivation: 'Consistency builds resilience. Each logged sleep session strengthens your performance baseline.',
  modeContext: 'Tactical modes adjust guidance to operational reality. No schedule is ideal; optimization still matters.',
  caffeineUtility: 'Caffeine is a mission tool. Timing determines whether it enhances or degrades performance.',
  napNormalization: 'Controlled rest and tactical naps are force multipliers, not signs of weakness.',
  painAwareness: 'Pain disrupts sleep architecture. Addressing positioning and tension improves recovery quality.',
  stressNormalization: 'Sleep disruption from stress is common in high-tempo environments. Tools exist; use them.',
  estimateDisclaimer: 'Performance estimates are based on sleep research and military data. Individual variation exists.',
  
  // Mode descriptions
  modes: {
    standard: {
      name: 'Standard Mode',
      description: 'Predictable schedules, controlled environment. Focus: build sleep banking and consistency.',
      sleepTarget: '7-8 hours',
      napStrategy: 'Optional 20-30 min naps for recovery',
      caffeineGuidance: 'Avoid after 1400 for 2200 sleep',
      windDown: 'Full routine: 5-min downshift, environment prep'
    },
    tactical: {
      name: 'Tactical Mode',
      description: 'Constrained schedules, variable conditions. Focus: maximize recovery in available windows.',
      sleepTarget: '4-6 hours + tactical naps',
      napStrategy: 'Prioritize 20-min naps when possible',
      caffeineGuidance: 'Use strategically; avoid within 4 hours of planned rest',
      windDown: 'Minimal routine: 2-min breathing, position check'
    },
    recovery: {
      name: 'Recovery Mode',
      description: 'Elevated arousal, hypervigilance. Focus: nervous system downshift and sleep protection.',
      sleepTarget: '6-8 hours; prioritize quality over duration',
      napStrategy: 'Short naps (10-20 min) to avoid deep sleep disruption',
      caffeineGuidance: 'Minimize; avoid entirely if possible',
      windDown: 'Extended routine: 5-min breathing, grounding, environment check'
    }
  },
  
  // Education tiles
  educationTiles: [
    {
      headline: 'Sleep deprivation equals intoxication-level impairment',
      body: 'After 17 hours awake, cognitive performance matches a 0.05% BAC. After 24 hours, it matches 0.10%. Reaction time, judgment, and coordination degrade predictably.'
    },
    {
      headline: '3 nights <5 hours increases injury risk',
      body: 'Consecutive short sleep disrupts neuromuscular coordination and tissue repair. Injury risk rises significantly, particularly in high-load training.'
    },
    {
      headline: 'Sleep loss degrades marksmanship and judgment',
      body: 'Studies show measurable declines in shooting accuracy, target discrimination, and tactical decision-making after inadequate sleep. Performance gaps widen under stress.'
    }
  ],
  
  // Downshift routines
  downshiftRoutines: [
    {
      name: 'Tactical Downshift',
      duration: 3,
      steps: [
        '60 sec: Box breathing (4-4-4-4 count, 6 cycles)',
        '60 sec: Jaw release (open, side-to-side, gentle pressure on masseter)',
        '60 sec: Neck release (chin tucks, slow rotations, shoulder drops)'
      ]
    },
    {
      name: 'Rapid Reset',
      duration: 2,
      steps: [
        '45 sec: 4-7-8 breathing (4 cycles: inhale 4, hold 7, exhale 8)',
        '45 sec: Body scan (feet to head, release tension points)',
        '30 sec: Grounding (5 objects you see, 3 sounds you hear)'
      ]
    }
  ],
  
  // Nap guidance
  napGuidance: {
    10: {
      name: '10-Minute Power Nap',
      wakeup: 'Set alarm for 12 minutes (includes 2-min fall-asleep buffer)',
      reactivation: 'Immediate: stand, stretch, cold water on face. Ready in 2 minutes.',
      note: 'Prevents deep sleep. Ideal for alertness boost without grogginess.'
    },
    20: {
      name: '20-Minute Tactical Nap',
      wakeup: 'Set alarm for 22 minutes',
      reactivation: 'Stand, light movement, hydrate. Ready in 3-5 minutes.',
      note: 'Standard tactical nap. Enhances alertness and motor performance.'
    },
    30: {
      name: '30-Minute Recovery Nap',
      wakeup: 'Set alarm for 32 minutes',
      reactivation: 'Expect 5-10 min grogginess. Movement and light help. Ready in 10 minutes.',
      note: 'Deeper rest. May enter light slow-wave sleep; brief inertia expected.'
    },
    90: {
      name: '90-Minute Full-Cycle Nap',
      wakeup: 'Set alarm for 92 minutes (one complete sleep cycle)',
      reactivation: 'Wake naturally at cycle end. Light movement. Ready in 5 minutes.',
      note: 'Full cycle: light → deep → REM. Maximizes cognitive and physical recovery.'
    }
  }
};
