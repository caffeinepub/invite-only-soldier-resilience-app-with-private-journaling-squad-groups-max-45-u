/**
 * Recommended Reading Content Module
 * 
 * Curated reading list for soldier mental performance, leadership, and resilience.
 * All content is educational summaries and principles (fair use), not full copyrighted text.
 */

export interface BookContent {
  id: string;
  title: string;
  author: string;
  category: string;
  whyItMatters: string;
  coreThemes: string[];
  actionableLessons: string[];
  excerptSummaries: string[];
  useThisWhen: string[];
  reflectionPrompts: string[];
  microActions: string[];
  libbySearchTerm?: string;
}

export const libbyGuide = {
  title: "How to Read for Free with Libby (DoD ID)",
  intro: "Access thousands of books and audiobooks for free using your DoD ID through the Libby app. No cost, no credit card required.",
  steps: [
    {
      title: "Install Libby",
      description: "Download the Libby app from the App Store (iOS) or Google Play Store (Android). It's completely free."
    },
    {
      title: "Find Your Library",
      description: "Search for your installation's library or any DoD library system. Most military installations have digital library access."
    },
    {
      title: "Sign In with DoD ID",
      description: "Use your DoD ID number or military email to create a library card. Some bases may require you to visit the library once to activate digital access."
    },
    {
      title: "Search and Borrow",
      description: "Search for any book by title or author. Tap 'Borrow' to check it out instantly. Most loans are 14-21 days."
    },
    {
      title: "Download for Offline",
      description: "After borrowing, tap 'Download' to read offline. Critical for field environments or deployments with limited connectivity."
    }
  ],
  tips: [
    "Download books before heading to the field or on deployment",
    "Set up multiple library cards if your installation's selection is limited",
    "Use the 'Notify Me' feature for popular titles with waitlists",
    "Audiobooks work great during PT, ruck marches, or commutes"
  ]
};

export const readingList: BookContent[] = [
  {
    id: "three-feet-from-gold",
    title: "Three Feet from Gold",
    author: "Sharon Lechter & Greg S. Reid",
    category: "Persistence & Mental Toughness",
    whyItMatters: "Teaches persistence when missions get hard and success feels impossible.",
    coreThemes: [
      "Most people quit right before breakthrough—the 'three feet from gold' principle",
      "Persistence is a trainable skill, not just willpower",
      "Mentorship and accountability accelerate success",
      "Small daily actions compound into major results",
      "Reframe failure as feedback, not defeat"
    ],
    actionableLessons: [
      "When a mission feels impossible, commit to one more day, one more rep, one more attempt",
      "Identify your 'three feet' moments—times you almost quit but pushed through",
      "Build a personal board of advisors: peers, NCOs, or mentors who keep you accountable",
      "Track small wins daily to build momentum during long-term goals"
    ],
    excerptSummaries: [
      "The core principle: Most people give up when they're closer to success than they realize. The miner who stops digging three feet before striking gold loses everything.",
      "Success formula: Burning desire + Definite plan + Persistence + Mastermind group = Achievement. Remove any element and the formula fails."
    ],
    useThisWhen: [
      "Facing a tough selection or qualification course",
      "Recovering from injury or setback",
      "Leading a team through a difficult training cycle",
      "Considering quitting a goal you've invested months into"
    ],
    reflectionPrompts: [
      "What goal have I quit on that I was probably close to achieving?",
      "Who in my unit embodies persistence? What can I learn from them?",
      "What's my 'three feet from gold' moment right now?"
    ],
    microActions: [
      "Commit to one more week on a goal you're considering abandoning",
      "Text a mentor or peer about a challenge you're facing",
      "Write down three small wins from today, no matter how tough the day was"
    ],
    libbySearchTerm: "Three Feet from Gold Sharon Lechter"
  },
  {
    id: "good-to-great",
    title: "Good to Great",
    author: "Jim Collins",
    category: "Leadership & Organizational Excellence",
    whyItMatters: "Shows how disciplined leaders build elite teams that sustain excellence over time.",
    coreThemes: [
      "Level 5 Leadership: Humility + Will = Sustained greatness",
      "First Who, Then What: Get the right people, then figure out the mission",
      "Confront brutal facts but never lose faith (Stockdale Paradox)",
      "Hedgehog Concept: Focus on what you can be best at",
      "Culture of discipline eliminates need for bureaucracy"
    ],
    actionableLessons: [
      "Build your team first, then assign roles—right people adapt to any mission",
      "Face hard truths about your unit's weaknesses without losing confidence in the mission",
      "Identify your unit's 'hedgehog'—the one thing you can dominate better than anyone",
      "Create disciplined routines that become automatic under stress"
    ],
    excerptSummaries: [
      "The Stockdale Paradox: Admiral Stockdale survived 8 years as a POW by confronting brutal reality while maintaining unwavering faith in eventual success. Optimists who denied reality didn't make it.",
      "Level 5 Leaders are humble but driven. They credit the team for success and take personal responsibility for failure. This builds trust and accountability."
    ],
    useThisWhen: [
      "Taking over a new team or leadership position",
      "Unit is stuck in 'good enough' performance",
      "Building SOPs or training plans",
      "Dealing with underperformers or toxic team members"
    ],
    reflectionPrompts: [
      "Am I a Level 5 leader? Do I deflect credit and absorb blame?",
      "What brutal facts is my team avoiding?",
      "What's our hedgehog concept—the one thing we can be the best at?"
    ],
    microActions: [
      "Identify one person on your team who doesn't belong and address it this week",
      "Write down three brutal facts about your unit's readiness",
      "Define one disciplined routine your team will execute daily for 30 days"
    ],
    libbySearchTerm: "Good to Great Jim Collins"
  },
  {
    id: "how-to-win-friends",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Communication & Influence",
    whyItMatters: "Timeless principles for building trust, resolving conflict, and leading without authority.",
    coreThemes: [
      "People crave appreciation and recognition—give it genuinely",
      "To influence, appeal to others' interests, not your own",
      "Admit mistakes quickly and emphatically to build credibility",
      "Let others save face, even when they're wrong",
      "Ask questions instead of giving orders to build ownership"
    ],
    actionableLessons: [
      "Start conversations by finding common ground or shared interests",
      "When correcting someone, begin with praise and acknowledge what they did right",
      "To change behavior, ask questions that lead them to the answer instead of lecturing",
      "Remember and use people's names—it's the sweetest sound to anyone"
    ],
    excerptSummaries: [
      "Principle: You can make more friends in two months by being interested in others than in two years trying to get others interested in you.",
      "Influence technique: The only way to win an argument is to avoid it. If you lose, you lose. If you win, you still lose—because the other person resents you."
    ],
    useThisWhen: [
      "Resolving conflict between team members",
      "Counseling a soldier who's struggling",
      "Building rapport with a new unit or chain of command",
      "Trying to influence peers or lateral leaders"
    ],
    reflectionPrompts: [
      "Who in my unit feels unappreciated? How can I recognize them this week?",
      "When was the last time I admitted a mistake quickly instead of defending it?",
      "Am I trying to win arguments or build relationships?"
    ],
    microActions: [
      "Give genuine appreciation to three people today",
      "Next time you disagree, ask questions instead of arguing",
      "Learn one personal fact about each team member this week"
    ],
    libbySearchTerm: "How to Win Friends and Influence People Dale Carnegie"
  },
  {
    id: "the-energy-bus",
    title: "The Energy Bus",
    author: "Jon Gordon",
    category: "Positivity & Team Culture",
    whyItMatters: "Teaches how to build positive team culture and eliminate energy vampires.",
    coreThemes: [
      "You're the driver of your bus—choose who gets on and who gets off",
      "Energy vampires drain teams—address or remove them",
      "Positive energy is contagious and attracts success",
      "Focus on what you can control, ignore the rest",
      "Love your passengers (team) even when they test you"
    ],
    actionableLessons: [
      "Identify energy vampires in your unit and limit their influence",
      "Start each day with a positive intention or gratitude practice",
      "When facing negativity, ask 'What can I control right now?'",
      "Build rituals that inject positive energy into your team (music, humor, recognition)"
    ],
    excerptSummaries: [
      "The No Energy Vampire Rule: Don't allow negative people to drain your energy. You can't control their negativity, but you can control your response and who you spend time with.",
      "The Power of Positive Energy: Positive leaders create positive cultures. Your energy as a leader sets the tone for the entire team."
    ],
    useThisWhen: [
      "Team morale is low or toxic",
      "Dealing with chronic complainers",
      "Starting a new training cycle or deployment",
      "Personal motivation is low"
    ],
    reflectionPrompts: [
      "Who are the energy vampires in my life? How do I limit their impact?",
      "What positive rituals can I build into my team's routine?",
      "Am I bringing positive or negative energy to my team?"
    ],
    microActions: [
      "Start tomorrow with three things you're grateful for",
      "Identify one energy vampire and set a boundary with them this week",
      "Inject one moment of humor or positivity into your team's day"
    ],
    libbySearchTerm: "The Energy Bus Jon Gordon"
  },
  {
    id: "qbq",
    title: "QBQ! The Question Behind the Question",
    author: "John G. Miller",
    category: "Personal Accountability",
    whyItMatters: "Eliminates excuses and victim mentality by teaching personal accountability.",
    coreThemes: [
      "QBQ principle: Ask better questions to get better outcomes",
      "Replace 'Why me?' with 'What can I do?'",
      "Replace 'When will they?' with 'How can I contribute?'",
      "Accountability is about action, not blame",
      "Victim thinking destroys teams and careers"
    ],
    actionableLessons: [
      "When something goes wrong, immediately ask 'What can I do to fix this?'",
      "Stop waiting for others to change—focus on your own actions",
      "Catch yourself making excuses and reframe with a QBQ",
      "Model accountability to build a culture where others follow"
    ],
    excerptSummaries: [
      "The QBQ Formula: Start with 'What' or 'How' (not 'Why', 'When', or 'Who'), contain 'I' (not 'they', 'them', or 'you'), and focus on action. Example: 'What can I do to improve this situation?'",
      "Accountability Mindset: Victims ask 'Why is this happening to me?' Accountable people ask 'How can I make this better?'"
    ],
    useThisWhen: [
      "Team is blaming leadership or external factors",
      "You're stuck in victim thinking",
      "Counseling a soldier who makes excuses",
      "Building a culture of ownership"
    ],
    reflectionPrompts: [
      "What excuses am I making right now?",
      "How can I reframe my complaints into QBQs?",
      "Where am I waiting for someone else to fix my problem?"
    ],
    microActions: [
      "Catch yourself making an excuse today and reframe it as a QBQ",
      "Identify one problem you're blaming others for and take one action to fix it",
      "Teach the QBQ principle to one team member this week"
    ],
    libbySearchTerm: "QBQ Question Behind the Question John Miller"
  },
  {
    id: "48-laws-of-power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    category: "Strategy & Influence",
    whyItMatters: "Teaches strategic thinking and how to navigate organizational politics.",
    coreThemes: [
      "Power dynamics exist everywhere—understand them or be manipulated",
      "Conceal your intentions until the right moment",
      "Master the art of timing—patience is a weapon",
      "Control the narrative and perception",
      "Build alliances and know when to use them"
    ],
    actionableLessons: [
      "Observe power dynamics in your unit—who has influence and why",
      "Don't reveal your full plan until you're ready to execute",
      "Build relationships across the organization, not just up and down",
      "When facing opposition, understand their motivations before acting"
    ],
    excerptSummaries: [
      "Law 1: Never outshine the master. Make your superiors feel superior. Subtle competence builds trust; overt brilliance breeds resentment.",
      "Law 16: Use absence to increase respect and honor. Too much presence diminishes value. Strategic withdrawal can increase your influence."
    ],
    useThisWhen: [
      "Navigating complex organizational politics",
      "Dealing with difficult leaders or peers",
      "Planning a major initiative or change",
      "Building influence without formal authority"
    ],
    reflectionPrompts: [
      "Who holds informal power in my organization? How did they build it?",
      "Am I revealing too much too soon in my plans?",
      "Where can I build strategic alliances?"
    ],
    microActions: [
      "Identify three informal power brokers in your unit and observe their tactics",
      "Practice strategic silence—don't reveal your next move for 48 hours",
      "Build one new relationship outside your immediate chain of command"
    ],
    libbySearchTerm: "48 Laws of Power Robert Greene"
  },
  {
    id: "extreme-ownership",
    title: "Extreme Ownership",
    author: "Jocko Willink & Leif Babin",
    category: "Leadership & Accountability",
    whyItMatters: "SEAL leadership principles proven in combat and applicable to any team.",
    coreThemes: [
      "Extreme Ownership: Leaders take responsibility for everything in their world",
      "No bad teams, only bad leaders",
      "Believe in the mission or you can't lead it",
      "Check the ego—mission success over personal pride",
      "Decentralized command: empower subordinates to lead"
    ],
    actionableLessons: [
      "When your team fails, ask 'What could I have done differently as a leader?'",
      "If you don't believe in the mission, work up the chain to understand or change it",
      "Empower your team to make decisions without asking permission",
      "Simplify plans—if your team doesn't understand it, they can't execute it"
    ],
    excerptSummaries: [
      "Extreme Ownership Principle: The leader is always responsible. Blaming subordinates, peers, or circumstances is a failure of leadership. Own everything in your world.",
      "Cover and Move: Teamwork. Every element must support others. Departments, units, and individuals must work together, not compete."
    ],
    useThisWhen: [
      "Team fails a mission or training event",
      "Struggling to get buy-in from your team",
      "Dealing with a toxic or underperforming subordinate",
      "Planning complex operations"
    ],
    reflectionPrompts: [
      "What failure am I blaming on others instead of owning?",
      "Do I truly believe in the mission I'm leading?",
      "Am I empowering my team or micromanaging them?"
    ],
    microActions: [
      "Own one failure publicly this week—no excuses, just accountability",
      "Simplify one complex plan or SOP so a private could execute it",
      "Delegate one decision you normally make to a subordinate"
    ],
    libbySearchTerm: "Extreme Ownership Jocko Willink"
  },
  {
    id: "discipline-equals-freedom",
    title: "Discipline Equals Freedom",
    author: "Jocko Willink",
    category: "Discipline & Mental Toughness",
    whyItMatters: "Discipline is the foundation of all success—this book shows how to build it.",
    coreThemes: [
      "Discipline equals freedom—structure creates options",
      "Default aggressive: when in doubt, take action",
      "Physical discipline builds mental discipline",
      "Wake up early, own your morning, own your day",
      "Suffering is growth—embrace discomfort"
    ],
    actionableLessons: [
      "Build a morning routine and execute it without negotiation",
      "When facing a decision, default to action over hesitation",
      "Use physical training as a tool to build mental resilience",
      "Identify one area of your life lacking discipline and fix it this week"
    ],
    excerptSummaries: [
      "Discipline Equals Freedom: The more disciplined you are, the more freedom you have. Discipline in fitness gives you health freedom. Discipline in finances gives you economic freedom. Discipline in relationships gives you emotional freedom.",
      "Default Aggressive: When you don't know what to do, take action. Hesitation and overthinking are the enemy. Move forward, adjust as needed."
    ],
    useThisWhen: [
      "Struggling with motivation or consistency",
      "Building a new habit or routine",
      "Recovering from a period of low discipline",
      "Preparing for a high-stress event"
    ],
    reflectionPrompts: [
      "Where am I lacking discipline in my life?",
      "What would my life look like with extreme discipline?",
      "Am I defaulting to action or hesitation?"
    ],
    microActions: [
      "Wake up 30 minutes earlier tomorrow and do something productive",
      "Identify one undisciplined habit and replace it with a disciplined one",
      "Do 100 burpees right now—no negotiation"
    ],
    libbySearchTerm: "Discipline Equals Freedom Jocko Willink"
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    author: "David Goggins",
    category: "Mental Toughness & Resilience",
    whyItMatters: "Goggins proves the human mind can overcome any obstacle with the right mindset.",
    coreThemes: [
      "The 40% Rule: When your mind says you're done, you're only 40% done",
      "Callous your mind through suffering—discomfort is growth",
      "Accountability mirror: face your weaknesses daily",
      "Cookie jar: draw on past victories when facing new challenges",
      "Embrace being uncomfortable—it's where growth happens"
    ],
    actionableLessons: [
      "When you want to quit, push 40% further—that's where growth lives",
      "Create an accountability mirror: write your goals and weaknesses where you see them daily",
      "Build a mental 'cookie jar' of past wins to draw on during hard times",
      "Seek out discomfort regularly to build mental calluses"
    ],
    excerptSummaries: [
      "The 40% Rule: When your mind is telling you you're done, you're really only 40% done. The mind is the most powerful weapon, but it's also the weakest link. It will quit on you if you let it.",
      "The Accountability Mirror: Post your goals and current weaknesses on your mirror. Face them every morning. No excuses, no lies. This brutal honesty drives change."
    ],
    useThisWhen: [
      "Facing a selection or qualification course",
      "Recovering from failure or setback",
      "Building mental toughness for high-stress events",
      "Feeling like quitting"
    ],
    reflectionPrompts: [
      "What's in my cookie jar—what hard things have I already overcome?",
      "Where am I quitting at 40% instead of pushing to 100%?",
      "What discomfort am I avoiding that I should embrace?"
    ],
    microActions: [
      "Do something uncomfortable today—cold shower, extra PT, difficult conversation",
      "Write down three past victories and post them where you'll see them daily",
      "Next time you want to quit, push 40% further"
    ],
    libbySearchTerm: "Can't Hurt Me David Goggins"
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    category: "Stoic Philosophy",
    whyItMatters: "A Roman emperor's personal journal on leading with virtue under extreme pressure.",
    coreThemes: [
      "Focus on what you can control, ignore the rest",
      "Obstacles are opportunities to practice virtue",
      "Death is natural—live with urgency and purpose",
      "Anger and frustration are choices, not reactions",
      "Serve others without expectation of reward"
    ],
    actionableLessons: [
      "When facing adversity, ask 'What virtue can I practice here?'",
      "Separate what you control (your actions, thoughts) from what you don't (others, outcomes)",
      "Start each day remembering you will face difficult people—prepare mentally",
      "Practice negative visualization: imagine losing what you have to appreciate it more"
    ],
    excerptSummaries: [
      "Stoic Principle: You have power over your mind, not outside events. Realize this, and you will find strength.",
      "Obstacle as Opportunity: The impediment to action advances action. What stands in the way becomes the way. Every obstacle is a chance to practice virtue."
    ],
    useThisWhen: [
      "Dealing with frustration or anger",
      "Facing uncontrollable circumstances",
      "Leading through chaos or uncertainty",
      "Needing perspective on hardship"
    ],
    reflectionPrompts: [
      "What am I trying to control that I can't?",
      "What obstacle is actually an opportunity in disguise?",
      "Am I living with urgency and purpose?"
    ],
    microActions: [
      "List three things you can control and three you can't—focus only on the first list",
      "Practice negative visualization: imagine losing something you value, then appreciate it",
      "When frustrated today, pause and ask 'What virtue can I practice here?'"
    ],
    libbySearchTerm: "Meditations Marcus Aurelius"
  },
  {
    id: "obstacle-is-the-way",
    title: "The Obstacle Is the Way",
    author: "Ryan Holiday",
    category: "Stoic Philosophy & Resilience",
    whyItMatters: "Modern application of Stoic principles to turn obstacles into advantages.",
    coreThemes: [
      "Perception: How you see the problem determines the solution",
      "Action: Move forward even with incomplete information",
      "Will: Build inner strength to endure what you can't change",
      "Every obstacle is an opportunity to practice virtue",
      "Focus on the process, not the outcome"
    ],
    actionableLessons: [
      "Reframe obstacles as training opportunities, not roadblocks",
      "Take action on what you can control, even if it's small",
      "Build resilience by enduring hardship without complaint",
      "Study how others turned adversity into advantage"
    ],
    excerptSummaries: [
      "The Stoic Triad: Perception (how you see it), Action (what you do about it), Will (how you endure it). Master these three and no obstacle can stop you.",
      "Turn Obstacles Upside Down: What blocks the path becomes the path. Use obstacles as fuel for growth, not excuses for failure."
    ],
    useThisWhen: [
      "Facing a major setback or failure",
      "Dealing with uncontrollable circumstances",
      "Building resilience in your team",
      "Needing a mindset shift"
    ],
    reflectionPrompts: [
      "How can I reframe this obstacle as an opportunity?",
      "What action can I take right now, even if it's small?",
      "What's one thing I can endure without complaint?"
    ],
    microActions: [
      "Identify your biggest current obstacle and list three ways it could benefit you",
      "Take one small action on a problem you've been avoiding",
      "Endure one discomfort today without complaining"
    ],
    libbySearchTerm: "The Obstacle Is the Way Ryan Holiday"
  },
  {
    id: "letters-from-a-stoic",
    title: "Letters from a Stoic",
    author: "Seneca",
    category: "Stoic Philosophy",
    whyItMatters: "Practical wisdom on living well, managing emotions, and facing mortality.",
    coreThemes: [
      "Time is your most valuable asset—don't waste it",
      "Poverty and wealth are both tests of character",
      "Prepare for adversity before it arrives",
      "True friendship is rare and valuable",
      "Death is not to be feared—it's the natural end of life"
    ],
    actionableLessons: [
      "Audit your time—eliminate activities that don't serve your goals or values",
      "Practice voluntary discomfort to prepare for involuntary hardship",
      "Invest in deep friendships with people who challenge and support you",
      "Reflect on mortality regularly to live with urgency"
    ],
    excerptSummaries: [
      "On Time: It's not that we have a short time to live, but that we waste much of it. Life is long if you know how to use it. Guard your time fiercely.",
      "On Adversity: Prepare for adversity in times of peace. The mind that is prepared for anything cannot be surprised by anything."
    ],
    useThisWhen: [
      "Feeling like time is slipping away",
      "Preparing for deployment or high-stress period",
      "Building deeper relationships",
      "Facing fear or anxiety"
    ],
    reflectionPrompts: [
      "How am I wasting time? What can I eliminate?",
      "Am I prepared for adversity, or will it surprise me?",
      "Who are my true friends—people who make me better?"
    ],
    microActions: [
      "Track your time for one day—identify one time-waster to eliminate",
      "Practice voluntary discomfort: skip a meal, take a cold shower, sleep on the floor",
      "Reach out to one person who challenges you to be better"
    ],
    libbySearchTerm: "Letters from a Stoic Seneca"
  },
  {
    id: "fm-6-22",
    title: "FM 6-22: Army Leadership",
    author: "U.S. Army",
    category: "Military Leadership Doctrine",
    whyItMatters: "Official Army doctrine on leadership—the foundation every soldier should know.",
    coreThemes: [
      "Be, Know, Do: Character, competence, and action define leaders",
      "Army Values: LDRSHIP (Loyalty, Duty, Respect, Selfless Service, Honor, Integrity, Personal Courage)",
      "Mission command: empower subordinates to exercise disciplined initiative",
      "Develop subordinates through coaching and mentorship",
      "Lead by example in all situations"
    ],
    actionableLessons: [
      "Assess yourself against the Be-Know-Do framework monthly",
      "Live the Army Values visibly—your team watches everything you do",
      "Give subordinates clear intent, then let them figure out how to execute",
      "Invest time in developing your team, not just completing tasks"
    ],
    excerptSummaries: [
      "Be-Know-Do Framework: Leaders must BE of strong character, KNOW their job and team, and DO the right thing. All three are required—one or two isn't enough.",
      "Mission Command: Provide clear commander's intent, empower subordinates to make decisions, and accept prudent risk. Micromanagement kills initiative."
    ],
    useThisWhen: [
      "Taking a new leadership position",
      "Counseling or developing subordinates",
      "Planning operations or training",
      "Dealing with ethical dilemmas"
    ],
    reflectionPrompts: [
      "Am I living the Army Values, or just talking about them?",
      "Do I empower my team or micromanage them?",
      "What am I doing to develop my subordinates?"
    ],
    microActions: [
      "Assess yourself against one Army Value this week—where are you weak?",
      "Give one subordinate a task with intent only—no step-by-step instructions",
      "Schedule 15 minutes this week to mentor one team member"
    ],
    libbySearchTerm: "Army Leadership FM 6-22"
  },
  {
    id: "behavior-ops-manual",
    title: "The Behavior Ops Manual",
    author: "Chase Hughes",
    category: "Behavioral Analysis & Influence",
    whyItMatters: "Teaches how to read people, detect deception, and influence behavior.",
    coreThemes: [
      "Behavior is predictable if you know what to look for",
      "Baseline behavior reveals deviations that signal stress or deception",
      "Influence is about understanding motivations, not manipulation",
      "Nonverbal communication reveals more than words",
      "Build rapport through mirroring and active listening"
    ],
    actionableLessons: [
      "Establish a baseline for each person—how they act when relaxed",
      "Look for clusters of behavior changes, not single signals",
      "Mirror body language subtly to build rapport",
      "Ask open-ended questions and listen more than you talk"
    ],
    excerptSummaries: [
      "Baseline Principle: You can't detect deception or stress without knowing someone's normal behavior. Spend time observing people in relaxed states first.",
      "Influence Formula: Understand their motivations, align your message with their values, and present options that serve their interests. People resist being told what to do but embrace their own conclusions."
    ],
    useThisWhen: [
      "Conducting interviews or investigations",
      "Building rapport with new team members",
      "Detecting stress or deception",
      "Influencing peers or superiors"
    ],
    reflectionPrompts: [
      "Do I observe people's baseline behavior before judging them?",
      "Am I listening to understand or just waiting to talk?",
      "How can I align my message with others' motivations?"
    ],
    microActions: [
      "Observe one person's baseline behavior for a full day",
      "Practice mirroring body language in your next conversation",
      "Ask three open-ended questions today and just listen"
    ],
    libbySearchTerm: "Behavior Ops Manual Chase Hughes"
  },
  {
    id: "six-minute-xray",
    title: "The Six-Minute X-Ray",
    author: "Chase Hughes",
    category: "Behavioral Analysis & Profiling",
    whyItMatters: "Rapid profiling techniques to understand people quickly and accurately.",
    coreThemes: [
      "Six domains of profiling: Appearance, Behavior, Communication, Environment, History, Relationships",
      "Rapid assessment techniques for high-stakes situations",
      "Micro-expressions reveal hidden emotions",
      "Context is everything—behavior means nothing without it",
      "Profiling is a skill, not a gift—it's trainable"
    ],
    actionableLessons: [
      "Use the six domains to quickly assess new people or situations",
      "Pay attention to micro-expressions—they reveal true emotions",
      "Always consider context before interpreting behavior",
      "Practice profiling daily to build the skill"
    ],
    excerptSummaries: [
      "Six-Minute X-Ray Method: Assess Appearance (how they present), Behavior (what they do), Communication (how they speak), Environment (where they operate), History (their background), and Relationships (who they connect with). Together, these reveal character and intent.",
      "Micro-Expressions: Emotions flash across the face in 1/25th of a second. Learn to spot them and you'll see what people are really feeling, not what they're saying."
    ],
    useThisWhen: [
      "Meeting new people in high-stakes situations",
      "Assessing team members or subordinates",
      "Conducting interviews or investigations",
      "Building situational awareness"
    ],
    reflectionPrompts: [
      "What do people's appearances and environments reveal about them?",
      "Am I missing micro-expressions because I'm not paying attention?",
      "How can I use profiling to better understand my team?"
    ],
    microActions: [
      "Profile one person today using the six domains",
      "Watch a conversation with the sound off—what do you notice?",
      "Practice spotting micro-expressions in your next meeting"
    ],
    libbySearchTerm: "Six-Minute X-Ray Chase Hughes"
  },
  {
    id: "farewell-to-arms",
    title: "A Farewell to Arms",
    author: "Ernest Hemingway",
    category: "War Literature & Human Experience",
    whyItMatters: "Hemingway's WWI novel captures the psychological toll of war and the search for meaning.",
    coreThemes: [
      "War strips away illusions and reveals raw humanity",
      "Love and connection are fragile in the face of chaos",
      "Courage is grace under pressure",
      "Disillusionment is a natural response to war's brutality",
      "Finding meaning in suffering is a personal journey"
    ],
    actionableLessons: [
      "Recognize that disillusionment after combat is normal, not weakness",
      "Protect relationships and connections—they're what sustain you",
      "Practice grace under pressure—stay calm when chaos erupts",
      "Seek meaning in your experiences, even the painful ones"
    ],
    excerptSummaries: [
      "Hemingway's Courage: 'Courage is grace under pressure.' The protagonist faces war's horrors without losing his humanity or composure.",
      "War's Disillusionment: The novel shows how war destroys romantic notions of glory and honor, leaving only survival and human connection as meaningful."
    ],
    useThisWhen: [
      "Processing combat or deployment experiences",
      "Dealing with disillusionment or loss of purpose",
      "Seeking to understand the human cost of war",
      "Building empathy for others' struggles"
    ],
    reflectionPrompts: [
      "What illusions has my service stripped away?",
      "How do I maintain grace under pressure?",
      "What gives my service meaning beyond the mission?"
    ],
    microActions: [
      "Write about one experience that changed your perspective on service",
      "Practice staying calm in one high-pressure situation this week",
      "Reach out to someone who might be struggling with disillusionment"
    ],
    libbySearchTerm: "A Farewell to Arms Ernest Hemingway"
  }
];

export const additionalRecommendations: BookContent[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Habit Formation & Performance",
    whyItMatters: "Small habits compound into major results—this book shows how to build them.",
    coreThemes: [
      "1% better every day compounds into massive improvement",
      "Focus on systems, not goals",
      "Make good habits obvious, attractive, easy, and satisfying",
      "Identity-based habits: become the type of person who does X",
      "Environment design is more powerful than willpower"
    ],
    actionableLessons: [
      "Stack new habits onto existing ones (habit stacking)",
      "Design your environment to make good habits easy and bad habits hard",
      "Focus on showing up, not perfection—consistency beats intensity",
      "Track your habits to build momentum and accountability"
    ],
    excerptSummaries: [
      "The 1% Rule: If you get 1% better each day for a year, you'll be 37 times better by the end. Small improvements compound exponentially.",
      "Identity-Based Habits: Don't focus on what you want to achieve, focus on who you want to become. Every action is a vote for the type of person you want to be."
    ],
    useThisWhen: [
      "Building new routines or breaking bad habits",
      "Struggling with consistency",
      "Designing training programs or SOPs",
      "Helping subordinates develop discipline"
    ],
    reflectionPrompts: [
      "What 1% improvement can I make today?",
      "What type of person do I want to become?",
      "How can I design my environment to support good habits?"
    ],
    microActions: [
      "Identify one habit to stack onto an existing routine",
      "Remove one temptation from your environment",
      "Track one habit for seven days straight"
    ],
    libbySearchTerm: "Atomic Habits James Clear"
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    category: "Purpose & Resilience",
    whyItMatters: "Holocaust survivor's insights on finding meaning in suffering—ultimate resilience.",
    coreThemes: [
      "Those who have a 'why' can endure any 'how'",
      "Suffering is inevitable, but how you respond is a choice",
      "Meaning comes from creating, experiencing, or choosing your attitude",
      "Freedom is the space between stimulus and response",
      "Love and purpose transcend circumstances"
    ],
    actionableLessons: [
      "Identify your 'why'—the purpose that drives you through hardship",
      "Practice choosing your response to adversity, not reacting",
      "Find meaning in suffering by serving others or pursuing a mission",
      "Remember that even in the worst circumstances, you control your attitude"
    ],
    excerptSummaries: [
      "The Why Principle: He who has a why to live can bear almost any how. Purpose gives you the strength to endure unimaginable suffering.",
      "Freedom of Choice: Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and freedom."
    ],
    useThisWhen: [
      "Facing extreme hardship or suffering",
      "Questioning the purpose of your service",
      "Dealing with loss or trauma",
      "Building resilience in yourself or others"
    ],
    reflectionPrompts: [
      "What's my 'why'—the purpose that drives me?",
      "How do I respond to suffering—with meaning or despair?",
      "Where can I find meaning in my current challenges?"
    ],
    microActions: [
      "Write down your 'why' and post it where you'll see it daily",
      "Practice pausing before reacting to adversity today",
      "Identify one way to serve others or pursue meaning this week"
    ],
    libbySearchTerm: "Man's Search for Meaning Viktor Frankl"
  }
];
