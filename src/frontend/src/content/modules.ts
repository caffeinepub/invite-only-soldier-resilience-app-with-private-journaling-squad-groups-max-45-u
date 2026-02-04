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
      },
      {
        type: 'interpretation',
        text: 'Understanding Stress vs. Distress: Not all stress is bad. Eustress (positive stress) is the productive tension that sharpens focus, drives performance, and builds capability—like the challenge of a tough workout, a time-sensitive mission, or learning a new skill. Distress, on the other hand, is overwhelming stress that degrades performance, clouds judgment, and damages health. The key difference isn\'t the stressor itself, but how you perceive and respond to it. A deadline can be energizing fuel or paralyzing pressure depending on your mindset, preparation, and recovery practices.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by Wim Hof: The power of controlled stress exposure through cold immersion and breathwork teaches us that we can train our stress response. By voluntarily entering uncomfortable situations in a controlled way, we build resilience and learn that discomfort is temporary and manageable. This practice rewires our relationship with stress, transforming fear into confidence.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by David Goggins: The concept of "callusing the mind" reminds us that mental toughness is built through repeated exposure to difficulty. When you push through discomfort—whether physical training, mental challenges, or emotional adversity—you expand your capacity. The voice that says "I can\'t" is often wrong. Most people quit at 40% of their actual capacity. Recognizing this gap is the first step to accessing your full potential.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by Jocko Willink: Discipline equals freedom. Structure, routine, and ownership of your actions create the foundation for handling stress effectively. When you control what you can control—your wake-up time, your training, your preparation—you build confidence that carries into uncontrollable situations. Take ownership of your stress response rather than being a victim of circumstances.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by Tom Brady and Michael Jordan: Elite performers understand that pressure is a privilege. The stress of high-stakes moments is an opportunity to demonstrate preparation and skill. They reframe pressure situations as chances to excel rather than threats to avoid. This mindset shift—from "I have to perform" to "I get to perform"—transforms distress into eustress.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by Mike Tyson: Everyone has a plan until they get punched in the face. Stress will disrupt your plans. The question is: can you adapt? Building mental toughness means training yourself to stay composed when things go wrong, to think clearly under pressure, and to execute fundamentals when chaos erupts. Practice staying calm in small disruptions to build capacity for larger ones.'
      },
      {
        type: 'interpretation',
        text: 'Inspired by Joe Rogan and Shawn Ryan: Open conversations about mental health, stress, and struggle normalize the challenges we all face. High performers don\'t hide their stress—they acknowledge it, learn from it, and share strategies that work. Building a support network where you can discuss stress openly reduces its power and provides practical solutions. Vulnerability is strength, not weakness.'
      },
      {
        type: 'interpretation',
        text: 'Practical Stress Management Framework: Identify your stressors and categorize them. Training stress, time pressure, and challenging goals can be eustress if you have adequate recovery. Sleep debt, unresolved conflict, chronic overload, and lack of control typically become distress. The solution isn\'t to eliminate all stress—it\'s to optimize the balance. Increase eustress through challenging but achievable goals. Reduce distress through better sleep, clear communication, boundary-setting, and asking for support when needed. Recovery isn\'t weakness—it\'s the foundation of sustained high performance.'
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
      },
      {
        text: 'Analyze your stress: eustress vs. distress',
        prefillTitle: 'My Stress Inventory: Eustress vs. Distress',
        prefillContent: 'Use this framework to understand and manage your stress:\n\n**CURRENT STRESSORS**\nList everything causing stress right now (work demands, training, relationships, finances, health, etc.):\n- \n- \n- \n\n**EUSTRESS (Productive Stress)**\nWhich stressors are challenging you in a good way—building skills, driving growth, or energizing you?\n- Stressor:\n- Why it\'s productive:\n- How I\'m managing it:\n\n**DISTRESS (Overwhelming Stress)**\nWhich stressors are degrading performance, health, or well-being?\n- Stressor:\n- Why it\'s harmful:\n- Warning signs I\'m noticing:\n\n**REFRAME OPPORTUNITY**\nCan any distress be reframed as eustress with better mindset, preparation, or support?\n- What would need to change:\n- Action I can take:\n\n**ACTION PLAN**\nChoose ONE action to convert distress to manageable stress or reduce overall load:\n□ Set a boundary (say no, delegate, ask for deadline extension)\n□ Improve preparation (plan ahead, break into smaller steps, gather resources)\n□ Seek support (talk to leader, mentor, or peer; ask for help)\n□ Reframe mindset (view as challenge vs. threat, focus on what I control)\n□ Other:\n\nSpecific action I will take this week:\n\n**RECOVERY PLAN**\nHow will I ensure adequate recovery to handle stress effectively?\n□ Sleep: Target ___ hours, improve sleep hygiene by ___\n□ Breathwork/meditation: ___ minutes daily\n□ Physical training: Adjust intensity/volume to ___\n□ Boundaries: Protect time for ___\n□ Connection: Reach out to ___ for support\n\n**REFLECTION**\nWhat did I learn about my stress response?\nWhat\'s one insight from Wim Hof, David Goggins, Jocko Willink, Tom Brady, Michael Jordan, Mike Tyson, Joe Rogan, or Shawn Ryan that resonates with my situation?'
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
  },
  {
    id: 'sleep-performance-1',
    category: 'Sleep Performance',
    title: 'Sleep as a Force Multiplier',
    description: 'Understand why sleep is the foundation of physical and mental performance, and how to optimize it.',
    content: [
      {
        type: 'quote',
        text: 'Sleep is essential for physical recovery, cognitive function, and overall readiness. Soldiers require 7-8 hours of quality sleep per night to maintain optimal performance.',
        citation: {
          source: 'FM 7-22: Holistic Health and Fitness',
          reference: 'Chapter 8, Sleep'
        }
      },
      {
        type: 'quote',
        text: 'Sleep is the single most effective thing we can do to reset our brain and body health each day.',
        citation: {
          source: 'Matthew Walker — Why We Sleep',
          reference: 'Introduction'
        }
      },
      {
        type: 'interpretation',
        text: 'Sleep isn\'t a luxury—it\'s a tactical advantage. Research from Matthew Walker\'s "Why We Sleep" reveals that even modest sleep deprivation (6 hours or less) impairs cognitive performance as much as being legally drunk. Reaction time slows, decision-making degrades, emotional regulation fails, and injury risk skyrockets. Yet many soldiers treat sleep as optional, sacrificing it for training, work, or entertainment. This is a strategic error. Elite military units and championship teams prioritize sleep because they understand: you can\'t out-train bad sleep. Every hour of quality sleep is a force multiplier for the next day\'s performance.'
      },
      {
        type: 'interpretation',
        text: 'The Science of Sleep Debt: Sleep debt accumulates like financial debt—with interest. Missing one hour of sleep doesn\'t just cost you that hour; it compounds over days and weeks, degrading performance, mood, and health. FM 7-22 emphasizes that chronic sleep deprivation increases injury rates, slows recovery, weakens immune function, and impairs learning. You can\'t "catch up" on weekends—the damage is already done. The solution is consistency: prioritize 7-8 hours every night, not just when convenient. Think of sleep as mission-critical preparation, not downtime.'
      },
      {
        type: 'interpretation',
        text: 'Sleep and Physical Performance: During deep sleep, your body releases growth hormone, repairs muscle tissue, consolidates motor learning, and restores energy systems. Matthew Walker\'s research shows that athletes who sleep 8+ hours have faster sprint times, better accuracy, quicker reaction times, and significantly lower injury rates than those sleeping 6 hours or less. For soldiers, this translates directly to combat readiness: better marksmanship, faster decision-making, improved endurance, and reduced risk of training injuries. If you want to perform at your peak, sleep is non-negotiable.'
      },
      {
        type: 'interpretation',
        text: 'Sleep and Mental Performance: Sleep is when your brain consolidates memories, processes emotions, and clears metabolic waste. Without adequate sleep, learning is impaired—you literally can\'t form new memories effectively. Emotional regulation fails, making you more reactive, irritable, and prone to poor decisions. FM 7-22 notes that sleep-deprived soldiers show impaired judgment, reduced situational awareness, and increased risk-taking behavior. In high-stakes environments, these deficits can be catastrophic. Prioritizing sleep isn\'t soft—it\'s smart leadership and tactical discipline.'
      },
      {
        type: 'interpretation',
        text: 'Sleep Hygiene Fundamentals: Create conditions for quality sleep. FM 7-22 and sleep science agree on the basics: (1) Consistent schedule—same bedtime and wake time, even on weekends. (2) Dark, cool, quiet environment—65-68°F is optimal. (3) No screens 1 hour before bed—blue light suppresses melatonin. (4) No caffeine after 2 PM—it has a 6-hour half-life. (5) No alcohol before bed—it fragments sleep and blocks REM. (6) Wind-down routine—signal your brain it\'s time to sleep. These aren\'t suggestions—they\'re performance protocols used by elite operators and athletes worldwide.'
      },
      {
        type: 'interpretation',
        text: 'Tactical Napping: When you can\'t get a full night\'s sleep, strategic napping can help. FM 7-22 recommends 20-30 minute "power naps" to restore alertness without entering deep sleep (which causes grogginess). Naps longer than 30 minutes or after 3 PM can interfere with nighttime sleep. Matthew Walker notes that naps improve learning, memory, and emotional regulation—but they don\'t replace nighttime sleep. Use naps tactically during sustained operations, but never as a substitute for proper sleep hygiene.'
      },
      {
        type: 'interpretation',
        text: 'Sleep and Recovery: Sleep is when adaptation happens. All the stress you impose through training—lifting weights, running miles, practicing skills—only becomes strength if you sleep. Without adequate sleep, training becomes destructive rather than constructive. You break down tissue but never fully rebuild it. FM 7-22 emphasizes that recovery is a pillar of the H2F system, and sleep is the foundation of recovery. If you\'re training hard but not sleeping well, you\'re working against yourself. Prioritize sleep as seriously as you prioritize training.'
      }
    ],
    prompts: [
      {
        text: 'Assess your current sleep habits and identify improvements',
        prefillTitle: 'My Sleep Performance Assessment',
        prefillContent: '**CURRENT SLEEP PATTERNS**\nAverage hours per night (last 7 days): ___\nBedtime consistency (same time ±30 min?): Yes / No\nWake time consistency: Yes / No\nHow I feel most mornings: (energized / okay / groggy / exhausted)\n\n**SLEEP ENVIRONMENT**\nRoom darkness: (completely dark / some light / bright)\nRoom temperature: ___ °F (optimal is 65-68°F)\nNoise level: (silent / some noise / disruptive)\nMattress/pillow comfort: (excellent / adequate / poor)\n\n**SLEEP DISRUPTORS**\nCheck all that apply:\n□ Screen time within 1 hour of bed\n□ Caffeine after 2 PM\n□ Alcohol before bed\n□ Irregular schedule (shift work, late duties)\n□ Stress/racing thoughts\n□ Physical discomfort or pain\n□ Roommate noise/disruption\n□ Early morning PT conflicts with sleep need\n\n**PERFORMANCE IMPACT**\nWhen I don\'t sleep well, I notice:\n□ Slower reaction time\n□ Poor decision-making\n□ Irritability/mood swings\n□ Reduced motivation\n□ Increased injury risk\n□ Difficulty learning new skills\n□ Decreased physical performance\n\n**IMPROVEMENT PLAN**\nBased on FM 7-22 and "Why We Sleep," I will:\n\n1. Sleep Schedule:\n   Target bedtime: ___\n   Target wake time: ___\n   Target hours: ___ (aim for 7-8)\n\n2. Sleep Hygiene Changes (choose 2-3 to start):\n   □ No screens 1 hour before bed\n   □ No caffeine after 2 PM\n   □ No alcohol before bed\n   □ Create wind-down routine: ___\n   □ Improve room darkness (blackout curtains, eye mask)\n   □ Adjust room temperature\n   □ Use white noise or earplugs\n\n3. Barriers and Solutions:\n   Barrier: ___\n   Solution: ___\n\n**COMMITMENT**\nI commit to prioritizing sleep as a force multiplier for my performance. I understand that sleep is not optional—it\'s mission-critical preparation.\n\nStart date: ___\nCheck-in date (1 week): ___'
      },
      {
        text: 'Track your sleep consistency and performance correlation',
        prefillTitle: 'Sleep Performance Log',
        prefillContent: '**WEEKLY SLEEP LOG**\n\nDay 1:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 2:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 3:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 4:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 5:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 6:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\nDay 7:\nBedtime: ___ | Wake time: ___ | Total hours: ___\nQuality (1-10): ___\nNext-day performance (1-10): ___\nNotes: ___\n\n**WEEKLY ANALYSIS**\nAverage sleep: ___ hours\nMost consistent nights: ___\nBest performance days: ___\nCorrelation I notice: ___\n\n**INSIGHTS**\nWhat helped me sleep well: ___\nWhat disrupted my sleep: ___\nHow sleep affected my training: ___\nHow sleep affected my mood: ___\nHow sleep affected my decision-making: ___\n\n**NEXT WEEK ADJUSTMENTS**\nWhat I\'ll keep doing: ___\nWhat I\'ll change: ___'
      },
      {
        text: 'Design your optimal wind-down routine',
        prefillTitle: 'My Sleep Wind-Down Routine',
        prefillContent: '**WIND-DOWN ROUTINE DESIGN**\n\nBased on FM 7-22 and sleep science, create a consistent pre-sleep routine that signals your brain it\'s time to rest.\n\n**TIMING**\nTarget bedtime: ___\nWind-down starts: ___ (60-90 minutes before bed)\n\n**PHASE 1: TRANSITION (60-90 min before bed)**\n□ Finish last meal/snack\n□ Complete evening hygiene\n□ Lay out next day\'s uniform/gear\n□ Review tomorrow\'s schedule\n□ Set alarm\n□ Other: ___\n\n**PHASE 2: WIND-DOWN (30-60 min before bed)**\nChoose 2-3 calming activities:\n□ Read (physical book, not screen)\n□ Light stretching or mobility work\n□ Breathwork or meditation\n□ Journal reflection\n□ Listen to calming music or podcast\n□ Warm shower\n□ Other: ___\n\n**PHASE 3: SLEEP PREP (15-30 min before bed)**\n□ Dim lights or use red light only\n□ Set room temperature to 65-68°F\n□ Ensure room is dark (curtains, eye mask)\n□ White noise or earplugs if needed\n□ Phone on silent, away from bed\n□ Final bathroom trip\n□ Other: ___\n\n**WHAT TO AVOID**\n□ Screens (phone, TV, tablet, laptop)\n□ Intense exercise\n□ Heavy meals\n□ Caffeine or alcohol\n□ Stressful conversations\n□ Work or problem-solving\n□ Bright lights\n\n**MY ROUTINE**\nWrite your specific wind-down sequence:\n\n___ PM: ___\n___ PM: ___\n___ PM: ___\n___ PM: ___\n___ PM: Lights out\n\n**COMMITMENT**\nI will follow this routine for 7 consecutive nights to establish the habit.\n\nStart date: ___\nReview date: ___\n\n**REFLECTION (after 1 week)**\nWhat worked well: ___\nWhat was challenging: ___\nHow my sleep improved: ___\nAdjustments for next week: ___'
      },
      {
        text: 'Analyze caffeine and alcohol impact on your sleep',
        prefillTitle: 'Caffeine & Alcohol Sleep Impact Analysis',
        prefillContent: '**CAFFEINE AUDIT**\n\nCaffeine has a 6-hour half-life. If you consume 200mg at 4 PM, 100mg is still in your system at 10 PM, disrupting sleep quality even if you fall asleep.\n\n**Current Caffeine Habits:**\nMorning intake (time & amount): ___\nAfternoon intake (time & amount): ___\nEvening intake (time & amount): ___\nTotal daily caffeine: ___ mg\n\nCommon sources:\n- Coffee (8 oz): ~95mg\n- Energy drink (8 oz): ~80mg\n- Pre-workout: ~150-300mg\n- Soda (12 oz): ~35mg\n\n**Sleep Impact:**\nDo I have trouble falling asleep? Yes / No\nDo I wake during the night? Yes / No\nDo I feel rested in the morning? Yes / No\n\n**ALCOHOL AUDIT**\n\nAlcohol may help you fall asleep faster, but it fragments sleep, blocks REM (dream) sleep, and causes early waking. Matthew Walker calls it "sedation, not sleep."\n\n**Current Alcohol Habits:**\nFrequency: ___ nights per week\nTypical amount: ___\nTiming relative to bed: ___\n\n**Sleep Impact:**\nDo I wake up during the night after drinking? Yes / No\nDo I feel rested after nights with alcohol? Yes / No\nDo I snore more after drinking? Yes / No\n\n**OPTIMIZATION PLAN**\n\n**Caffeine Strategy:**\n□ Cut off caffeine by 2 PM (recommended)\n□ Reduce total daily intake to ___ mg\n□ Switch afternoon coffee to decaf\n□ Replace afternoon caffeine with water, walk, or power nap\n□ Eliminate pre-workout supplements after ___ PM\n\n**Alcohol Strategy:**\n□ No alcohol within 3 hours of bedtime\n□ Limit to ___ drinks maximum\n□ Alcohol-free nights: ___ per week\n□ Replace evening drinks with: ___\n\n**EXPERIMENT**\nI will test these changes for 7 days and track:\n- Sleep quality (1-10): ___\n- Time to fall asleep: ___\n- Night wakings: ___\n- Morning energy (1-10): ___\n- Next-day performance (1-10): ___\n\n**RESULTS (after 7 days)**\nWhat I noticed: ___\nPerformance changes: ___\nWill I continue these changes? Yes / No\nWhy or why not: ___'
      },
      {
        text: 'Plan sleep strategy for high-tempo operations',
        prefillTitle: 'Tactical Sleep Strategy for Sustained Operations',
        prefillContent: '**SCENARIO PLANNING**\n\nDuring field exercises, deployments, or high-tempo training, perfect sleep isn\'t always possible. FM 7-22 and sleep science provide strategies to maintain performance when sleep is limited.\n\n**UPCOMING HIGH-TEMPO PERIOD**\nEvent/operation: ___\nDuration: ___\nExpected sleep disruption: ___\n\n**BANK SLEEP (Before)**\nIn the 3-5 days before sustained operations, prioritize extra sleep:\n□ Target 8-9 hours per night\n□ Maintain consistent schedule\n□ Optimize sleep hygiene\n□ Avoid alcohol and late caffeine\n□ Goal: Enter operation well-rested\n\n**TACTICAL NAPPING (During)**\nWhen nighttime sleep is limited, use strategic naps:\n□ 20-30 minute power naps (restore alertness, no grogginess)\n□ Nap before 3 PM if possible (won\'t disrupt night sleep)\n□ Even 10-15 minutes helps if that\'s all you have\n□ Find quiet, dark spot when possible\n□ Set alarm to avoid oversleeping\n\n**CAFFEINE TACTICS (During)**\nUse caffeine strategically, not constantly:\n□ Time caffeine for critical performance windows\n□ Avoid continuous dosing (causes tolerance and crash)\n□ "Caffeine nap": consume caffeine, nap 20 min, wake as it kicks in\n□ Stop caffeine 6+ hours before planned sleep\n□ Don\'t exceed 400mg daily (performance degrades beyond this)\n\n**RECOVERY SLEEP (After)**\nAfter sustained operations, prioritize recovery:\n□ First 24-48 hours: sleep as much as needed\n□ Return to consistent schedule within 3 days\n□ Avoid "revenge sleep" (sleeping 12+ hours repeatedly)\n□ Focus on quality: dark, cool, quiet, no alcohol\n□ Light exercise helps reset circadian rhythm\n\n**PERFORMANCE MONITORING**\nWatch for signs of dangerous sleep debt:\n□ Microsleeps (brief lapses in attention)\n□ Slowed reaction time\n□ Poor decision-making\n□ Emotional volatility\n□ Increased injury risk\n\nIf you notice these, communicate with leadership. Sleep-deprived soldiers are a liability, not an asset.\n\n**TEAM SLEEP PLAN**\nIf you\'re a leader, protect your team\'s sleep:\n□ Rotate guard/watch duties fairly\n□ Enforce sleep discipline (no unnecessary noise)\n□ Model good sleep behavior\n□ Plan operations around sleep needs when possible\n□ Recognize that rested soldiers perform better\n\n**COMMITMENT**\nI understand that sleep is a weapon system. Even in high-tempo operations, I will use these strategies to maintain readiness.\n\n**POST-OPERATION REFLECTION**\nWhat worked: ___\nWhat was challenging: ___\nHow sleep affected my performance: ___\nWhat I\'ll do differently next time: ___'
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
  'Identity & Values',
  'Sleep Performance'
];
