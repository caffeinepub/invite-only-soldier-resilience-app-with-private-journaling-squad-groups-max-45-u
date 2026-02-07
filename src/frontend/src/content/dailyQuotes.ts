import { generateQuoteId } from '../utils/quoteId';

export interface DailyQuote {
  id: string;
  quote: string;
  author: string;
  category: string;
  annotation: string;
}

const rawQuotes = [
  {
    quote: "What doesn't kill us makes us stronger.",
    author: "Friedrich Nietzsche",
    category: "Resilience & Overcoming Adversity",
    annotation: "Encourages soldiers to see challenges as opportunities for growth."
  },
  {
    quote: "The obstacle in the path becomes the path.",
    author: "Marcus Aurelius",
    category: "Resilience & Overcoming Adversity",
    annotation: "Reminds soldiers that hardships are part of their development."
  },
  {
    quote: "Fall seven times, stand up eight.",
    author: "Japanese proverb",
    category: "Resilience & Overcoming Adversity",
    annotation: "Inspires persistence despite repeated setbacks."
  },
  {
    quote: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    author: "Mark Twain",
    category: "Resilience & Overcoming Adversity",
    annotation: "Highlights that bravery is about mastering fear, crucial for soldiers."
  },
  {
    quote: "You must do the thing you think you cannot do.",
    author: "Eleanor Roosevelt",
    category: "Resilience & Overcoming Adversity",
    annotation: "Pushes soldiers to confront challenges beyond their comfort zone."
  },
  {
    quote: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca",
    category: "Resilience & Overcoming Adversity",
    annotation: "Shows that mental toughness is built through challenges."
  },
  {
    quote: "It is not the mountain we conquer but ourselves.",
    author: "Sir Edmund Hillary",
    category: "Resilience & Overcoming Adversity",
    annotation: "Encourages self-mastery as the true measure of success."
  },
  {
    quote: "If you are going through hell, keep going.",
    author: "Winston Churchill",
    category: "Resilience & Overcoming Adversity",
    annotation: "Reminds soldiers that perseverance is essential in tough times."
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Resilience & Overcoming Adversity",
    annotation: "Encourages soldiers to keep pushing forward despite setbacks."
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Resilience & Overcoming Adversity",
    annotation: "Teaches soldiers to find lessons and growth in challenges."
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: "Confidence & Self-Belief",
    annotation: "Reminds soldiers that mindset shapes performance."
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Confidence & Self-Belief",
    annotation: "Encourages soldiers to trust in their ability to succeed."
  },
  {
    quote: "Confidence is preparation.",
    author: "Roy Bennett",
    category: "Confidence & Self-Belief",
    annotation: "Shows that thorough preparation builds self-assurance."
  },
  {
    quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    category: "Confidence & Self-Belief",
    annotation: "Encourages soldiers to stay authentic under pressure."
  },
  {
    quote: "You are braver than you believe, stronger than you seem.",
    author: "A.A. Milne",
    category: "Confidence & Self-Belief",
    annotation: "Inspires self-belief during physically and mentally tough moments."
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Confidence & Self-Belief",
    annotation: "Motivates soldiers to see the value of their daily efforts."
  },
  {
    quote: "Self-confidence is the first requisite to great undertakings.",
    author: "Samuel Johnson",
    category: "Confidence & Self-Belief",
    annotation: "Reinforces the need for belief in oneself before action."
  },
  {
    quote: "No one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt",
    category: "Confidence & Self-Belief",
    annotation: "Empowers soldiers to own their self-esteem."
  },
  {
    quote: "Confidence comes from discipline and training.",
    author: "Robert F. Kennedy",
    category: "Confidence & Self-Belief",
    annotation: "Shows that confidence is earned through preparation."
  },
  {
    quote: "Be fearless in the pursuit of what sets your soul on fire.",
    author: "Jennifer Lee",
    category: "Confidence & Self-Belief",
    annotation: "Encourages bold action in pursuit of meaningful goals."
  },
  {
    quote: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
    category: "Discipline & Habits",
    annotation: "Highlights the importance of daily structure for achieving success."
  },
  {
    quote: "We do not rise to the level of our expectations, we fall to the level of our training.",
    author: "Archilochus / Military maxim",
    category: "Discipline & Habits",
    annotation: "Emphasizes training as the foundation for performance under pressure."
  },
  {
    quote: "The secret of your future is hidden in your daily routine.",
    author: "Mike Murdock",
    category: "Discipline & Habits",
    annotation: "Encourages soldiers to focus on consistent small actions."
  },
  {
    quote: "The pain of discipline weighs ounces; the pain of regret weighs tons.",
    author: "Unknown",
    category: "Discipline & Habits",
    annotation: "Motivates adherence to training and healthy routines."
  },
  {
    quote: "Excellence is not an act, but a habit.",
    author: "Aristotle",
    category: "Discipline & Habits",
    annotation: "Reminds soldiers that greatness comes from consistent effort."
  },
  {
    quote: "Small disciplines repeated with consistency every day lead to great achievements.",
    author: "Robin Sharma",
    category: "Discipline & Habits",
    annotation: "Highlights the cumulative effect of small actions over time."
  },
  {
    quote: "Motivation gets you going. Discipline keeps you growing.",
    author: "John C. Maxwell",
    category: "Discipline & Habits",
    annotation: "Encourages soldiers to rely on habits, not just inspiration."
  },
  {
    quote: "Success isn't owned. It's leased—and rent is due every day.",
    author: "J.J. Watt",
    category: "Discipline & Habits",
    annotation: "Reinforces the need for daily effort to maintain performance."
  },
  {
    quote: "The more disciplined you become, the easier life gets.",
    author: "Steve Pavlina",
    category: "Discipline & Habits",
    annotation: "Shows that self-control simplifies complex challenges."
  },
  {
    quote: "Your habits create your future.",
    author: "Jack Canfield",
    category: "Discipline & Habits",
    annotation: "Reminds soldiers that consistent actions shape long-term results."
  },
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese proverb",
    category: "Discipline & Habits",
    annotation: "Encourages soldiers to start positive habits immediately."
  },
  {
    quote: "You will never always be motivated, so you must learn to be disciplined.",
    author: "Unknown",
    category: "Discipline & Habits",
    annotation: "Highlights that discipline carries you when motivation fades."
  },
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln (attributed)",
    category: "Discipline & Habits",
    annotation: "Teaches soldiers to prioritize long-term goals over short-term impulses."
  },
  {
    quote: "Without discipline, there's no life at all.",
    author: "Katharine Hepburn",
    category: "Discipline & Habits",
    annotation: "Emphasizes that self-control is foundational for success."
  },
  {
    quote: "The cost of excellence is discipline. The price of mediocrity is disappointment.",
    author: "William Arthur Ward",
    category: "Discipline & Habits",
    annotation: "Shows that consistent effort leads to mastery."
  },
  {
    quote: "Routine, in an intelligent man, is a sign of ambition.",
    author: "W.H. Auden",
    category: "Discipline & Habits",
    annotation: "Reminds soldiers that structured habits signal purposeful action."
  },
  {
    quote: "It's not what we do once in a while that shapes our lives, but what we do consistently.",
    author: "Tony Robbins",
    category: "Discipline & Habits",
    annotation: "Encourages consistent practice over sporadic effort."
  },
  {
    quote: "Do today what others won't so tomorrow you can do what others can't.",
    author: "Jerry Rice",
    category: "Discipline & Habits",
    annotation: "Inspires soldiers to put in extra work for long-term advantage."
  },
  {
    quote: "Discipline is doing what needs to be done, even if you don't want to do it.",
    author: "Unknown",
    category: "Discipline & Habits",
    annotation: "Reminds soldiers that commitment outweighs desire."
  },
  {
    quote: "Success requires replacement of excuses with discipline.",
    author: "Unknown",
    category: "Discipline & Habits",
    annotation: "Encourages personal accountability and structure."
  },
  {
    quote: "Lead me, follow me, or get out of my way.",
    author: "General George S. Patton",
    category: "Leadership & Influence",
    annotation: "A call to decisive leadership and action."
  },
  {
    quote: "The supreme quality of leadership is integrity.",
    author: "Dwight D. Eisenhower",
    category: "Leadership & Influence",
    annotation: "Shows that trust and honesty define strong leaders."
  },
  {
    quote: "A leader is one who knows the way, goes the way, and shows the way.",
    author: "John C. Maxwell",
    category: "Leadership & Influence",
    annotation: "Highlights leadership through example and action."
  },
  {
    quote: "Earn your leadership every day.",
    author: "Michael Jordan",
    category: "Leadership & Influence",
    annotation: "Reminds soldiers that respect and authority must be maintained consistently."
  },
  {
    quote: "Leadership is a series of behaviors not a role for heroes.",
    author: "Donald H. McGannon",
    category: "Leadership & Influence",
    annotation: "Shows that leadership is about consistent action, not titles."
  },
  {
    quote: "The art of leadership is saying no.",
    author: "Tony Blair",
    category: "Leadership & Influence",
    annotation: "Teaches leaders to prioritize and make tough decisions."
  },
  {
    quote: "Leadership is influence.",
    author: "John Maxwell",
    category: "Leadership & Influence",
    annotation: "Emphasizes that leadership is measured by impact, not position."
  },
  {
    quote: "The strength of the team is each individual member.",
    author: "Phil Jackson",
    category: "Leadership & Influence",
    annotation: "Reinforces teamwork as the core of unit effectiveness."
  },
  {
    quote: "A leader is best when people barely know he exists.",
    author: "Lao Tzu",
    category: "Leadership & Influence",
    annotation: "Highlights subtle guidance as powerful leadership."
  },
  {
    quote: "Before you are a leader, success is all about growing yourself.",
    author: "Jack Welch",
    category: "Leadership & Influence",
    annotation: "Shows that self-development precedes effective leadership."
  },
  {
    quote: "Courage is grace under pressure.",
    author: "Ernest Hemingway",
    category: "Courage & Bravery",
    annotation: "Inspires soldiers to maintain composure in high-stress situations."
  },
  {
    quote: "Fortune favors the bold.",
    author: "Virgil",
    category: "Courage & Bravery",
    annotation: "Encourages calculated risk-taking and bravery."
  },
  {
    quote: "Courage is doing what you're afraid to do.",
    author: "Eddie Rickenbacker",
    category: "Courage & Bravery",
    annotation: "Shows that action in spite of fear is true bravery."
  },
  {
    quote: "He who is brave is free.",
    author: "Seneca",
    category: "Courage & Bravery",
    annotation: "Links courage to personal liberation and resilience."
  },
  {
    quote: "Be courageous and try to right your wrongs.",
    author: "Dorothy Day",
    category: "Courage & Bravery",
    annotation: "Inspires soldiers to act ethically even in difficult situations."
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "Courage & Bravery",
    annotation: "Motivates soldiers to take purposeful action in life."
  },
  {
    quote: "To dare is to lose one's footing momentarily.",
    author: "Sören Kierkegaard",
    category: "Courage & Bravery",
    annotation: "Teaches that risk is part of growth and achievement."
  },
  {
    quote: "Act boldly and unseen forces will come to your aid.",
    author: "Dorothea Brande",
    category: "Courage & Bravery",
    annotation: "Encourages decisive action even in uncertainty."
  },
  {
    quote: "All progress requires courage.",
    author: "W.E.B. Du Bois",
    category: "Courage & Bravery",
    annotation: "Highlights bravery as the foundation of advancement."
  },
  {
    quote: "Courage starts with showing up and letting ourselves be seen.",
    author: "Brené Brown",
    category: "Courage & Bravery",
    annotation: "Encourages vulnerability and action as forms of bravery."
  },
  {
    quote: "Know thy self, know thy enemy.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Core principle for soldiers: awareness of self and adversary."
  },
  {
    quote: "All warfare is based on deception.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Teaches strategic thinking and psychological advantage."
  },
  {
    quote: "Victorious warriors win first and then go to war.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Highlights the value of preparation over action."
  },
  {
    quote: "In war, the way is to avoid what is strong.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Teaches tactical maneuvering and adaptability."
  },
  {
    quote: "Strategy without tactics is the slowest route to victory.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Emphasizes aligning planning with execution."
  },
  {
    quote: "Tactics without strategy is noise before defeat.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Warns against action without purpose."
  },
  {
    quote: "He who knows when he can fight and when he cannot will be victorious.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Teaches situational awareness and timing in action."
  },
  {
    quote: "Opportunities multiply as they are seized.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Encourages proactive action to generate more success."
  },
  {
    quote: "Speed is the essence of war.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Highlights the importance of swift, decisive action."
  },
  {
    quote: "A wise commander avoids battle.",
    author: "Sun Tzu",
    category: "Strategy & Tactical Thinking",
    annotation: "Shows that discretion is a key tactical skill."
  },
  {
    quote: "It is the mark of an educated mind to entertain a thought without accepting it.",
    author: "Aristotle",
    category: "Rationality & Critical Thinking",
    annotation: "Encourages soldiers to consider ideas carefully before acting."
  },
  {
    quote: "The greatest obstacle to discovery is not ignorance — it is the illusion of knowledge.",
    author: "Daniel J. Boorstin",
    category: "Rationality & Critical Thinking",
    annotation: "Highlights the danger of overconfidence in decision-making."
  }
];

export const dailyQuotes: DailyQuote[] = rawQuotes.map((q) => ({
  id: generateQuoteId(q.quote, q.author),
  ...q
}));
