export interface ModulePrompt {
  text: string;
  prefillTitle: string;
  prefillContent: string;
}

export interface ModuleContent {
  type: 'quote' | 'interpretation';
  text: string;
  citation?: {
    source: string;
    reference: string;
  };
}

export interface Module {
  id: string;
  title: string;
  category: string;
  description: string;
  content: ModuleContent[];
  prompts: ModulePrompt[];
}

export const MODULES: Module[] = [
  {
    id: 'mental-readiness-1',
    category: 'Mental Readiness',
    title: 'Building Mental Toughness',
    description: 'Develop the mental resilience needed to perform under pressure and overcome challenges.',
    content: [
      {
        type: 'quote',
        text: 'Mental toughness is the ability to consistently perform toward the upper range of your talent and skill regardless of competitive circumstances.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 3, Mental Readiness'
        }
      },
      {
        type: 'interpretation',
        text: 'Mental toughness isn\'t about being fearless—it\'s about acting despite fear. Like elite athletes who train their minds as rigorously as their bodies, soldiers can develop mental resilience through deliberate practice. Start by identifying one challenging situation you face regularly. Before entering it, visualize yourself handling it with confidence. After, reflect on what worked and what you can improve. This cycle of preparation, action, and reflection builds the neural pathways that make mental toughness automatic.'
      }
    ],
    prompts: [
      {
        text: 'Reflect on a recent challenge where you demonstrated mental toughness',
        prefillTitle: 'Mental Toughness in Action',
        prefillContent: 'Describe a recent situation where you had to push through difficulty:\n\n1. What was the challenge?\n2. What thoughts or feelings did you experience?\n3. How did you overcome them?\n4. What did this experience teach you about your mental strength?\n5. How can you apply this lesson to future challenges?'
      },
      {
        text: 'Identify areas where you want to build greater mental resilience',
        prefillTitle: 'Building My Mental Resilience',
        prefillContent: 'Think about situations where you want to be mentally stronger:\n\n1. What situations challenge your mental toughness most?\n2. What specific mental skills would help you in these situations?\n3. What small step can you take this week to build that skill?\n4. Who can support you in this growth?'
      }
    ]
  },
  {
    id: 'resilience-1',
    category: 'Resilience',
    title: 'Bouncing Back from Setbacks',
    description: 'Learn to recover quickly from difficulties and adapt to change.',
    content: [
      {
        type: 'quote',
        text: 'Resilience is the ability to grow and thrive in the face of challenges and bounce back from adversity.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 3, Mental Component'
        }
      },
      {
        type: 'interpretation',
        text: 'Resilience is like a muscle—it grows stronger with use. Research on high-performing teams shows that resilient individuals share a common trait: they view setbacks as temporary and specific, not permanent and pervasive. When something goes wrong, they ask "What can I learn?" instead of "Why does this always happen to me?" Practice reframing setbacks as data points in your growth journey. Each challenge overcome adds to your resilience reserve, making you stronger for the next one.'
      }
    ],
    prompts: [
      {
        text: 'Write about a setback and what you learned from it',
        prefillTitle: 'Learning from Setbacks',
        prefillContent: 'Reflect on a recent setback or failure:\n\n1. What happened?\n2. What was your initial reaction?\n3. What did you learn from this experience?\n4. How did this setback ultimately make you stronger?\n5. What would you tell a fellow soldier facing a similar situation?'
      },
      {
        text: 'Identify your resilience strengths',
        prefillTitle: 'My Resilience Strengths',
        prefillContent: 'Think about times you\'ve bounced back:\n\n1. What personal strengths helped you recover?\n2. What support systems did you rely on?\n3. What coping strategies worked best?\n4. How can you use these strengths in current challenges?'
      }
    ]
  },
  {
    id: 'decision-making-1',
    category: 'Decision Making',
    title: 'Effective Decision Making Under Pressure',
    description: 'Develop the ability to make sound decisions quickly in high-stress situations.',
    content: [
      {
        type: 'quote',
        text: 'Leaders must be able to make sound and timely decisions under conditions of uncertainty, pressure, and complexity.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 2, Leadership'
        }
      },
      {
        type: 'interpretation',
        text: 'Elite military units and championship sports teams share a secret: they practice decision-making under pressure before they need it. The OODA loop (Observe, Orient, Decide, Act) isn\'t just military doctrine—it\'s a framework for rapid decision-making in any high-stakes situation. The key is to train your decision-making process during calm moments so it becomes automatic under stress. Start by analyzing past decisions: What information did you have? What did you prioritize? What would you do differently? This reflection builds the pattern recognition that enables fast, accurate decisions when it matters most.'
      }
    ],
    prompts: [
      {
        text: 'Analyze a recent decision you made under pressure',
        prefillTitle: 'Decision Under Pressure',
        prefillContent: 'Think about a recent high-pressure decision:\n\n1. What was the situation and time constraint?\n2. What information did you have (or lack)?\n3. What factors did you consider?\n4. What was the outcome?\n5. What would you do the same or differently next time?'
      },
      {
        text: 'Develop your decision-making framework',
        prefillTitle: 'My Decision-Making Process',
        prefillContent: 'Create your personal decision-making guide:\n\n1. What values guide your decisions?\n2. What questions do you ask yourself when facing a tough choice?\n3. Who do you consult for different types of decisions?\n4. How do you handle decisions when information is incomplete?'
      }
    ]
  },
  {
    id: 'communication-1',
    category: 'Communication',
    title: 'Clear and Effective Communication',
    description: 'Master the art of communicating clearly and effectively in all situations.',
    content: [
      {
        type: 'quote',
        text: 'Effective communication is essential to building trust and cohesion within teams.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 2, Communication Skills'
        }
      },
      {
        type: 'interpretation',
        text: 'Communication isn\'t just about talking—it\'s about being understood. The best communicators, from military leaders to professional coaches, follow a simple principle: clarity over cleverness. Before speaking, ask yourself: What\'s the one thing I need this person to understand? Then say that, clearly and directly. In high-performing teams, communication flows both ways. Practice active listening: repeat back what you heard, ask clarifying questions, and confirm understanding. This simple habit prevents most miscommunications and builds trust.'
      }
    ],
    prompts: [
      {
        text: 'Reflect on a communication success or challenge',
        prefillTitle: 'Communication Reflection',
        prefillContent: 'Think about a recent communication experience:\n\n1. What was the situation?\n2. What message were you trying to convey?\n3. How well was it received?\n4. What communication techniques worked well?\n5. What could you improve for next time?'
      },
      {
        text: 'Identify your communication strengths and growth areas',
        prefillTitle: 'My Communication Style',
        prefillContent: 'Assess your communication abilities:\n\n1. What are your communication strengths?\n2. In what situations do you communicate most effectively?\n3. What communication challenges do you face?\n4. What specific skill would most improve your communication?'
      }
    ]
  },
  {
    id: 'team-cohesion-1',
    category: 'Team Cohesiveness',
    title: 'Building Strong Teams',
    description: 'Learn how to build and maintain cohesive, high-performing teams.',
    content: [
      {
        type: 'quote',
        text: 'Cohesive teams are built on trust, shared purpose, and mutual respect.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 2, Team Building'
        }
      },
      {
        type: 'interpretation',
        text: 'Championship teams aren\'t built on talent alone—they\'re built on trust. Research on elite military units and professional sports teams reveals a pattern: the strongest teams invest in relationships. They know each other\'s strengths, weaknesses, and stories. They celebrate wins together and support each other through losses. You can build this in your team by being intentional: learn one new thing about a teammate each week, acknowledge their contributions publicly, and be the first to offer help when someone struggles. Small acts of connection compound into unbreakable bonds.'
      }
    ],
    prompts: [
      {
        text: 'Reflect on what makes your team strong',
        prefillTitle: 'Our Team Strengths',
        prefillContent: 'Think about your current or past team:\n\n1. What makes (or made) this team effective?\n2. What role do you play in team cohesion?\n3. What specific actions build trust in your team?\n4. How does your team handle conflict or disagreement?\n5. What can you do to strengthen team bonds?'
      },
      {
        text: 'Identify ways to contribute to team cohesion',
        prefillTitle: 'Building Team Cohesion',
        prefillContent: 'Plan your contribution to team strength:\n\n1. What are your team\'s current challenges?\n2. How can you help address these challenges?\n3. What teammate could use your support right now?\n4. What team tradition or ritual could you start or strengthen?'
      }
    ]
  },
  {
    id: 'identity-1',
    category: 'Identity & Values',
    title: 'Living Army Values Daily',
    description: 'Embody the Army values in your daily life and build your identity as a high-performing soldier.',
    content: [
      {
        type: 'quote',
        text: 'The Army Values—Loyalty, Duty, Respect, Selfless Service, Honor, Integrity, and Personal Courage—are the foundation of the Army profession.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 1, Army Values'
        }
      },
      {
        type: 'interpretation',
        text: 'Values aren\'t just words on a wall—they\'re choices you make every day. The most respected soldiers and athletes share a common trait: their actions align with their stated values, even when no one is watching. This integrity builds self-respect and earns the respect of others. Start small: choose one Army value to focus on this week. Look for opportunities to live it in everyday situations—not just in uniform, but in all aspects of life. When you consistently act on your values, they become part of your identity. You don\'t just know what a good soldier does—you become one.'
      }
    ],
    prompts: [
      {
        text: 'Reflect on how Army values show up in your life',
        prefillTitle: 'Living My Values',
        prefillContent: 'Think about the Army values in your daily life:\n\n1. Which Army value resonates most strongly with you right now?\n2. Describe a recent situation where you demonstrated this value.\n3. How did living this value make you feel?\n4. What challenges do you face in consistently living your values?\n5. How do these values benefit you outside of military service?'
      },
      {
        text: 'Identify positive outcomes from your service',
        prefillTitle: 'Positive Outcomes of Service',
        prefillContent: 'Reflect on how being a soldier has positively impacted your life:\n\n1. What personal strengths have you developed through service?\n2. What relationships or connections have enriched your life?\n3. What skills have you gained that benefit you in all areas of life?\n4. How has service shaped your character and identity?\n5. What are you most proud of in your journey as a soldier?'
      }
    ]
  }
];

export const CATEGORIES = [
  'Mental Readiness',
  'Resilience',
  'Decision Making',
  'Communication',
  'Team Cohesiveness',
  'Identity & Values'
];
