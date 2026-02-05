/**
 * Assessment Outcome Content
 * 
 * Soldier-facing explanations, relevance, and actionable insights
 * for each assessment outcome. Content is delivered via briefing/scenario
 * style cards with interactive elements.
 */

import type { AssessmentOutcomeContent } from '../types/assessments';

export const OUTCOME_CONTENT: Record<string, AssessmentOutcomeContent> = {
  // OCEAN Outcomes
  'ocean-o': {
    outcomeId: 'ocean-o',
    whatItMeasures: 'Openness to experience—your willingness to explore new ideas, adapt to change, and think creatively.',
    relevance: 'High openness drives innovation and adaptability in complex operations. You excel at problem-solving in novel situations and can help your team see new approaches.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Adapting plans when conditions change. Use this to help your team pivot during fluid situations.',
      },
      {
        type: 'scenario',
        title: 'Leadership Opportunity',
        content: 'Your squad is stuck using outdated tactics. How do you leverage your openness?',
        choices: [
          {
            id: 'propose',
            text: 'Propose alternative approaches backed by research',
            feedback: 'Excellent—innovation with justification builds credibility',
          },
          {
            id: 'wait',
            text: 'Wait for leadership to recognize the need',
            feedback: 'Misses opportunity to lead from any position',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance innovation with execution. Ensure new ideas are grounded in mission requirements and team capabilities.',
      },
    ],
  },
  'ocean-c': {
    outcomeId: 'ocean-c',
    whatItMeasures: 'Conscientiousness—your discipline, organization, and commitment to standards.',
    relevance: 'High conscientiousness is critical for mission success. You maintain standards, follow through on commitments, and ensure details are handled correctly.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Reliability under pressure. You\'re the operator others count on to execute flawlessly.',
      },
      {
        type: 'scenario',
        title: 'Team Role',
        content: 'Your team is preparing for a high-stakes operation. Where do you add most value?',
        choices: [
          {
            id: 'checklist',
            text: 'Own the pre-mission checklist and quality control',
            feedback: 'Perfect fit—your discipline prevents critical oversights',
          },
          {
            id: 'creative',
            text: 'Focus on creative problem-solving',
            feedback: 'Play to your strengths—discipline is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance perfectionism with speed. In combat, 80% solution executed now beats 100% solution too late.',
      },
    ],
  },
  'ocean-e': {
    outcomeId: 'ocean-e',
    whatItMeasures: 'Extraversion—your energy from social interaction and comfort leading groups.',
    relevance: 'High extraversion supports team cohesion and morale. You energize others, build connections quickly, and thrive in collaborative environments.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Building team cohesion and maintaining morale during extended operations.',
      },
      {
        type: 'scenario',
        title: 'Leadership Opportunity',
        content: 'Team morale is low after a tough week. How do you leverage your extraversion?',
        choices: [
          {
            id: 'engage',
            text: 'Organize team activity and re-energize the group',
            feedback: 'Excellent—your energy is contagious and mission-critical',
          },
          {
            id: 'individual',
            text: 'Let everyone decompress individually',
            feedback: 'Misses your strength—collective energy drives resilience',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Recognize introverts need different recharge strategies. Balance group energy with individual space.',
      },
    ],
  },
  'ocean-a': {
    outcomeId: 'ocean-a',
    whatItMeasures: 'Agreeableness—your focus on cooperation, empathy, and team harmony.',
    relevance: 'High agreeableness builds trust and psychological safety. You create environments where team members support each other and communicate openly.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Mediating conflict and maintaining team cohesion under stress.',
      },
      {
        type: 'scenario',
        title: 'Team Challenge',
        content: 'Two team members are in conflict. How do you leverage your agreeableness?',
        choices: [
          {
            id: 'mediate',
            text: 'Facilitate a conversation to find common ground',
            feedback: 'Perfect—your empathy restores team effectiveness',
          },
          {
            id: 'avoid',
            text: 'Let them work it out to avoid taking sides',
            feedback: 'Misses your strength—proactive mediation prevents escalation',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance harmony with accountability. Sometimes mission success requires difficult conversations.',
      },
    ],
  },
  'ocean-n': {
    outcomeId: 'ocean-n',
    whatItMeasures: 'Neuroticism/Stress Response—your emotional reactivity to pressure and uncertainty.',
    relevance: 'Higher stress awareness means you recognize pressure early. This can be an asset if you develop coping strategies—you\'ll spot team stress before others.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your awareness: Early detection of stress in yourself and others. Use this to implement countermeasures proactively.',
      },
      {
        type: 'scenario',
        title: 'Stress Management',
        content: 'You feel stress building before a major operation. What\'s your move?',
        choices: [
          {
            id: 'tactical',
            text: 'Use tactical breathing and pre-mission routine',
            feedback: 'Excellent—proactive stress management is a combat skill',
          },
          {
            id: 'ignore',
            text: 'Push through and ignore it',
            feedback: 'Risky—unmanaged stress degrades performance',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Build stress inoculation through controlled exposure. Practice box breathing (4-4-4-4) and visualization daily.',
      },
    ],
  },

  // MBTI Outcomes (sample for key types)
  'mbti-estj': {
    outcomeId: 'mbti-estj',
    whatItMeasures: 'ESTJ (Extraversion, Sensing, Thinking, Judging)—organized, decisive, and results-focused leadership.',
    relevance: 'Natural fit for leadership roles requiring structure and execution. You excel at organizing teams, setting clear standards, and driving mission completion.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You bring order to chaos. Your ability to structure operations and hold standards makes you a force multiplier.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Your squad needs better organization. How do you apply your ESTJ strengths?',
        choices: [
          {
            id: 'systems',
            text: 'Implement clear systems and accountability',
            feedback: 'Perfect—structure enables performance',
          },
          {
            id: 'flexible',
            text: 'Keep things loose and flexible',
            feedback: 'Misses your strength—your structure is your value',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance structure with flexibility. Adapt your approach for team members who need different leadership styles.',
      },
    ],
  },
  'mbti-infp': {
    outcomeId: 'mbti-infp',
    whatItMeasures: 'INFP (Introversion, Intuition, Feeling, Perceiving)—values-driven, empathetic, and adaptable.',
    relevance: 'You bring meaning and purpose to the mission. Your empathy builds deep trust, and your values keep the team grounded in what matters.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You connect mission to meaning. This drives intrinsic motivation and long-term commitment.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Team morale is low—they\'ve lost sight of the mission\'s purpose. How do you help?',
        choices: [
          {
            id: 'meaning',
            text: 'Reconnect the team to the mission\'s deeper purpose',
            feedback: 'Excellent—meaning drives sustained performance',
          },
          {
            id: 'push',
            text: 'Push harder on execution',
            feedback: 'Misses your strength—your empathy is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance idealism with pragmatism. Ensure your values translate into actionable mission execution.',
      },
    ],
  },

  // DISC Outcomes
  'disc-d': {
    outcomeId: 'disc-d',
    whatItMeasures: 'Dominance style—direct, results-focused, and decisive under pressure.',
    relevance: 'Natural fit for high-pressure leadership. You make quick decisions, drive results, and thrive in competitive environments.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You take charge when others hesitate. Your decisiveness is critical in time-sensitive operations.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Mission timeline just compressed. How do you leverage your Dominance?',
        choices: [
          {
            id: 'decide',
            text: 'Make rapid decisions and drive execution',
            feedback: 'Perfect—your decisiveness is mission-critical',
          },
          {
            id: 'consensus',
            text: 'Build consensus before acting',
            feedback: 'Too slow—play to your strength in crisis',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance speed with team input. Quick decisions are powerful, but team buy-in ensures sustained execution.',
      },
    ],
  },
  'disc-i': {
    outcomeId: 'disc-i',
    whatItMeasures: 'Influence style—enthusiastic, persuasive, and relationship-focused.',
    relevance: 'You build coalitions and inspire action. Your ability to motivate others and build relationships is critical for team cohesion.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You energize teams and build momentum. Your enthusiasm is contagious and drives collective action.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Team needs to rally for a difficult mission. How do you leverage your Influence?',
        choices: [
          {
            id: 'inspire',
            text: 'Rally the team with vision and energy',
            feedback: 'Excellent—your influence drives commitment',
          },
          {
            id: 'directive',
            text: 'Issue clear directives',
            feedback: 'Misses your strength—your inspiration is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance enthusiasm with follow-through. Ensure your inspiration translates into sustained execution.',
      },
    ],
  },
  'disc-s': {
    outcomeId: 'disc-s',
    whatItMeasures: 'Steadiness style—supportive, reliable, and team-oriented.',
    relevance: 'You provide stability and support. Your consistency and loyalty create the foundation for long-term team performance.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You\'re the team\'s anchor. Your reliability and support enable others to take risks and perform.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Team is stressed after rapid changes. How do you leverage your Steadiness?',
        choices: [
          {
            id: 'stabilize',
            text: 'Provide stability and consistent support',
            feedback: 'Perfect—your steadiness restores team confidence',
          },
          {
            id: 'change',
            text: 'Push for more rapid change',
            feedback: 'Misses your strength—your stability is your value',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance stability with adaptability. Ensure your consistency doesn\'t become resistance to necessary change.',
      },
    ],
  },
  'disc-c': {
    outcomeId: 'disc-c',
    whatItMeasures: 'Conscientiousness style—analytical, precise, and quality-focused.',
    relevance: 'You ensure accuracy and maintain standards. Your attention to detail prevents critical errors and ensures mission success.',
    insights: [
      {
        type: 'briefing',
        title: 'Leadership Strength',
        content: 'You catch what others miss. Your precision and quality focus prevent mission failure.',
      },
      {
        type: 'scenario',
        title: 'Team Application',
        content: 'Mission planning needs quality control. How do you leverage your Conscientiousness?',
        choices: [
          {
            id: 'analyze',
            text: 'Conduct thorough analysis and quality checks',
            feedback: 'Excellent—your precision prevents critical failures',
          },
          {
            id: 'speed',
            text: 'Prioritize speed over accuracy',
            feedback: 'Misses your strength—your quality focus is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance perfectionism with speed. In combat, good enough executed now often beats perfect too late.',
      },
    ],
  },

  // Strengths Outcomes
  'strengths-strategic': {
    outcomeId: 'strengths-strategic',
    whatItMeasures: 'Strategic thinking—your ability to analyze, plan, and anticipate challenges.',
    relevance: 'You see patterns others miss and plan multiple moves ahead. This is critical for mission planning and risk mitigation.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Anticipating challenges and developing contingency plans. Use this in mission planning.',
      },
      {
        type: 'scenario',
        title: 'Leadership Opportunity',
        content: 'Your team is planning a complex operation. How do you apply your strategic strength?',
        choices: [
          {
            id: 'wargame',
            text: 'War-game scenarios and develop contingencies',
            feedback: 'Perfect—your foresight prevents mission failure',
          },
          {
            id: 'execute',
            text: 'Focus on immediate execution',
            feedback: 'Misses your strength—your planning is your value',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance planning with action. Ensure your strategic thinking translates into executable plans.',
      },
    ],
  },
  'strengths-relational': {
    outcomeId: 'strengths-relational',
    whatItMeasures: 'Relational strength—your ability to build connections, understand others, and create team cohesion.',
    relevance: 'You build the trust and psychological safety that enable high-performing teams. This is critical for sustained operations.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Building trust and understanding team dynamics. Use this to strengthen team cohesion.',
      },
      {
        type: 'scenario',
        title: 'Team Challenge',
        content: 'New team members are struggling to integrate. How do you apply your relational strength?',
        choices: [
          {
            id: 'connect',
            text: 'Facilitate connections and build team bonds',
            feedback: 'Excellent—your relational strength accelerates team formation',
          },
          {
            id: 'wait',
            text: 'Let relationships develop naturally',
            feedback: 'Misses your strength—proactive connection-building is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance relationships with mission focus. Ensure your connection-building drives operational effectiveness.',
      },
    ],
  },
  'strengths-execution': {
    outcomeId: 'strengths-execution',
    whatItMeasures: 'Execution strength—your ability to get things done, deliver results, and maintain momentum.',
    relevance: 'You turn plans into reality. Your ability to execute consistently is the foundation of mission success.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Converting plans into results. You\'re the operator who makes things happen.',
      },
      {
        type: 'scenario',
        title: 'Team Role',
        content: 'Mission planning is complete. Where do you add most value?',
        choices: [
          {
            id: 'execute',
            text: 'Drive execution and maintain momentum',
            feedback: 'Perfect—your execution strength is mission-critical',
          },
          {
            id: 'refine',
            text: 'Continue refining the plan',
            feedback: 'Misses your strength—your execution is your value',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance execution with adaptation. Ensure your drive for results includes flexibility when conditions change.',
      },
    ],
  },
  'strengths-influence': {
    outcomeId: 'strengths-influence',
    whatItMeasures: 'Influence strength—your ability to motivate, persuade, and inspire action in others.',
    relevance: 'You move people to action. Your ability to influence and inspire is critical for leadership at all levels.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Inspiring commitment and driving collective action. Use this to build team momentum.',
      },
      {
        type: 'scenario',
        title: 'Leadership Opportunity',
        content: 'Team commitment is wavering. How do you apply your influence strength?',
        choices: [
          {
            id: 'inspire',
            text: 'Reconnect team to mission purpose and inspire action',
            feedback: 'Excellent—your influence restores commitment',
          },
          {
            id: 'directive',
            text: 'Issue clear directives',
            feedback: 'Misses your strength—your inspiration is your force multiplier',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Balance inspiration with execution. Ensure your influence translates into sustained results.',
      },
    ],
  },

  // GAT/Resilience Outcomes
  'gat-high': {
    outcomeId: 'gat-high',
    whatItMeasures: 'High resilience and emotional intelligence—strong stress management, adaptability, and emotional regulation.',
    relevance: 'You maintain performance under pressure and recover quickly from setbacks. This is critical for sustained operations and leadership.',
    insights: [
      {
        type: 'briefing',
        title: 'Tactical Application',
        content: 'Your strength: Maintaining composure and performance under extreme stress. You\'re a stabilizing force for your team.',
      },
      {
        type: 'scenario',
        title: 'Leadership Opportunity',
        content: 'Team is under extreme stress. How do you leverage your high resilience?',
        choices: [
          {
            id: 'model',
            text: 'Model calm composure and coach stress management',
            feedback: 'Perfect—your resilience is contagious and mission-critical',
          },
          {
            id: 'ignore',
            text: 'Focus on mission and ignore stress',
            feedback: 'Misses opportunity—your resilience can elevate the team',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Share your strategies. Your resilience is a teachable skill—mentor others in stress management techniques.',
      },
    ],
  },
  'gat-moderate': {
    outcomeId: 'gat-moderate',
    whatItMeasures: 'Moderate resilience—solid stress management with room for growth in high-pressure situations.',
    relevance: 'You handle most stress effectively but may struggle in extreme conditions. Building resilience now prepares you for future challenges.',
    insights: [
      {
        type: 'briefing',
        title: 'Development Path',
        content: 'Your foundation is solid. Focus on stress inoculation through controlled exposure and recovery practice.',
      },
      {
        type: 'scenario',
        title: 'Resilience Building',
        content: 'You\'re facing increasing pressure. What\'s your development strategy?',
        choices: [
          {
            id: 'train',
            text: 'Practice stress management techniques daily',
            feedback: 'Excellent—resilience is a trainable skill',
          },
          {
            id: 'avoid',
            text: 'Avoid high-stress situations',
            feedback: 'Misses growth opportunity—controlled exposure builds resilience',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Build your resilience toolkit: box breathing (4-4-4-4), visualization, physical training, and social support.',
      },
    ],
  },
  'gat-building': {
    outcomeId: 'gat-building',
    whatItMeasures: 'Building resilience—developing stress management and emotional regulation capabilities.',
    relevance: 'You\'re building critical skills. Focus on foundational resilience practices and seek support when needed.',
    insights: [
      {
        type: 'briefing',
        title: 'Development Path',
        content: 'Resilience is trainable. Start with fundamentals: sleep, physical training, and tactical breathing.',
      },
      {
        type: 'scenario',
        title: 'Resilience Building',
        content: 'You\'re feeling overwhelmed. What\'s your first move?',
        choices: [
          {
            id: 'support',
            text: 'Seek support and implement stress management basics',
            feedback: 'Perfect—seeking support is a strength, not weakness',
          },
          {
            id: 'tough',
            text: 'Tough it out alone',
            feedback: 'Risky—resilience requires support and strategy',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Priority actions: 1) Ensure 7-8 hours sleep, 2) Practice box breathing daily, 3) Connect with your support network.',
      },
    ],
  },
  'gat-developing': {
    outcomeId: 'gat-developing',
    whatItMeasures: 'Developing resilience—early stage of building stress management capabilities.',
    relevance: 'You\'re at the start of your resilience journey. This is the most important time to build foundational skills and seek support.',
    insights: [
      {
        type: 'briefing',
        title: 'Development Path',
        content: 'Start with the basics: sleep, nutrition, physical training, and connection. These are force multipliers for resilience.',
      },
      {
        type: 'scenario',
        title: 'First Steps',
        content: 'You want to build resilience. Where do you start?',
        choices: [
          {
            id: 'foundation',
            text: 'Focus on sleep, training, and support network',
            feedback: 'Perfect—fundamentals first, advanced skills later',
          },
          {
            id: 'advanced',
            text: 'Jump to advanced stress management techniques',
            feedback: 'Build the foundation first—basics are 80% of resilience',
          },
        ],
      },
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Immediate actions: 1) Talk to your leadership or chaplain, 2) Prioritize 7-8 hours sleep, 3) Maintain physical training routine.',
      },
    ],
  },
};

// Fallback for any missing outcomes
export function getOutcomeContent(outcomeId: string): AssessmentOutcomeContent {
  return OUTCOME_CONTENT[outcomeId] || {
    outcomeId,
    whatItMeasures: 'This outcome measures a specific aspect of your personality or resilience.',
    relevance: 'Understanding this trait helps you leverage your strengths and develop areas for growth.',
    insights: [
      {
        type: 'text',
        title: 'Development Focus',
        content: 'Reflect on how this trait shows up in your daily work and relationships.',
      },
    ],
  };
}
