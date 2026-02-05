/**
 * Leader Guidance Content
 * 
 * Practical, military-focused guidance for squad leaders to interpret
 * assessment results for team cohesion, role assignment, and leadership development.
 */

import type { AssessmentType } from '../types/assessments';

export interface LeaderGuidanceSection {
  title: string;
  content: string;
}

export interface LeaderGuidance {
  assessmentType: AssessmentType;
  outcomePattern: string;
  teamRole: LeaderGuidanceSection;
  communication: LeaderGuidanceSection;
  frictionPoints: LeaderGuidanceSection;
  coaching: LeaderGuidanceSection;
}

export const LEADER_GUIDANCE: LeaderGuidance[] = [
  {
    assessmentType: 'ocean',
    outcomePattern: 'high-openness',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Innovation, problem-solving, adaptability roles. Use them when plans need to pivot or novel solutions are required. They excel in fluid, complex situations.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Engage them in planning and problem-solving. Ask "what if" questions. They respond well to challenges that require creative thinking.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May resist rigid SOPs or become frustrated with repetitive tasks. Balance their need for novelty with mission requirements.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Channel their creativity into mission-relevant innovation. Help them understand when to follow established procedures vs. when to adapt.',
    },
  },
  {
    assessmentType: 'ocean',
    outcomePattern: 'high-conscientiousness',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Quality control, planning, logistics, standards enforcement. They ensure nothing falls through the cracks and maintain discipline.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Provide clear expectations and standards. They appreciate structure and detailed guidance. Recognize their reliability publicly.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May struggle with rapid changes or "good enough" solutions. Can become perfectionistic under stress.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Help them balance perfectionism with speed. Teach them to prioritize and accept 80% solutions when time is critical.',
    },
  },
  {
    assessmentType: 'mbti',
    outcomePattern: 'extravert',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Team leadership, morale officer, liaison roles. They energize the team and build external relationships effectively.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Engage them in group discussions and team activities. They process by talking—give them opportunities to verbalize.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May dominate conversations or struggle with solo tasks. Need to balance their social energy with mission focus.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Channel their energy into team-building and morale. Teach them to create space for introverts to contribute.',
    },
  },
  {
    assessmentType: 'mbti',
    outcomePattern: 'introvert',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Analysis, planning, technical roles, one-on-one mentoring. They excel in focused, deep-work environments.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Give them time to process before expecting input. Use written communication for complex topics. Respect their need for solo work time.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May be overlooked in group settings or drained by excessive social demands. Need recovery time after intense group work.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Create opportunities for them to contribute in ways that leverage their depth. Don\'t mistake quiet for disengagement.',
    },
  },
  {
    assessmentType: 'disc',
    outcomePattern: 'dominance',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Crisis leadership, rapid decision-making, competitive environments. They thrive under pressure and drive results.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Be direct and results-focused. They respect competence and decisiveness. Don\'t waste their time with unnecessary details.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May steamroll others or make decisions too quickly. Can create tension with more collaborative team members.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Teach them to slow down for team input when time allows. Help them see that building buy-in accelerates execution.',
    },
  },
  {
    assessmentType: 'disc',
    outcomePattern: 'influence',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Team motivation, coalition-building, external relations. They inspire action and build momentum.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Engage them with vision and purpose. They respond to enthusiasm and opportunities to inspire others.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May over-promise or struggle with follow-through. Can be overly optimistic about timelines.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Pair their inspiration with execution support. Help them translate enthusiasm into concrete action plans.',
    },
  },
  {
    assessmentType: 'disc',
    outcomePattern: 'steadiness',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Team stability, support roles, long-term projects. They provide the consistency that enables others to perform.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Provide stability and clear expectations. They appreciate consistency and personal connection.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May resist rapid change or struggle with conflict. Can be too accommodating at the expense of mission needs.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Help them build comfort with change. Teach them that stability sometimes requires difficult conversations.',
    },
  },
  {
    assessmentType: 'gat',
    outcomePattern: 'high-resilience',
    teamRole: {
      title: 'Best Team Roles',
      content: 'High-stress operations, mentoring, crisis response. They maintain performance when others struggle.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Leverage them as resilience models. Ask them to share strategies with the team.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May have unrealistic expectations of others\' stress tolerance. Need to remember resilience is developed, not innate.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Develop them as resilience mentors. Help them articulate their strategies so others can learn.',
    },
  },
  {
    assessmentType: 'gat',
    outcomePattern: 'building-resilience',
    teamRole: {
      title: 'Best Team Roles',
      content: 'Roles with manageable stress and strong support. Gradually increase challenge as resilience builds.',
    },
    communication: {
      title: 'Communication Approach',
      content: 'Provide clear support and check-ins. Normalize stress and emphasize that resilience is trainable.',
    },
    frictionPoints: {
      title: 'Potential Friction',
      content: 'May struggle in high-stress situations or feel inadequate compared to peers. Need reassurance and skill-building.',
    },
    coaching: {
      title: 'Coaching Strategy',
      content: 'Focus on fundamentals: sleep, training, support network. Celebrate small wins. Connect them with mentors.',
    },
  },
];

export function getLeaderGuidanceForOutcome(assessmentType: AssessmentType, outcomeId: string): LeaderGuidance[] {
  // Return relevant guidance based on assessment type and outcome
  return LEADER_GUIDANCE.filter(g => g.assessmentType === assessmentType);
}
