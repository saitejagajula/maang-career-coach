import type { User, Job, StrategyResult, StarterPrompt } from '@/types';

// ─── Mock User ────────────────────────────────────────────────────────────────

export const mockUser: User = {
  id: 'user-1',
  name: 'Sai Teja',
  email: 'saiteja@example.com',
  title: 'Software Engineer',
  location: 'San Francisco, CA',
  yearsOfExperience: 5,
  education: [
    {
      degree: 'B.Tech',
      major: 'Computer Science & Engineering',
      institution: 'IIT Hyderabad',
      year: '2020',
    },
  ],
  skills: [
    'Python', 'Java', 'TypeScript', 'React', 'Node.js',
    'System Design', 'Data Structures', 'Algorithms',
    'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis',
  ],
  targetCompanies: ['Google', 'Meta', 'Amazon'],
  targetRoles: ['Software Engineer', 'Senior Software Engineer', 'Staff Engineer'],
  resumeSummary:
    'Experienced software engineer with 5 years building scalable distributed systems and web applications. Passionate about clean architecture and developer experience.',
  profileCompleteness: 78,
  linkedinUrl: 'https://linkedin.com/in/saiteja',
  githubUrl: 'https://github.com/saiteja',
};

// ─── Mock Jobs ────────────────────────────────────────────────────────────────

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    company: 'Google',
    role: 'Software Engineer',
    category: 'Software Engineering',
    level: 'L5',
    location: 'Mountain View, CA',
    locationType: 'Hybrid',
    postedDate: '2026-03-05',
    requiredSkills: ['Python', 'Java', 'Distributed Systems', 'Algorithms'],
    preferredSkills: ['Go', 'Kubernetes', 'ML Pipelines'],
    description:
      'Join Google\'s core infrastructure team to build planet-scale distributed systems powering billions of users.',
    responsibilities: [
      'Design and implement large-scale distributed systems',
      'Lead technical direction for your team',
      'Mentor junior engineers',
      'Drive cross-functional technical initiatives',
    ],
    fitScore: 87,
    salaryRange: '$220,000 – $310,000',
    applyUrl: 'https://careers.google.com',
    tags: ['Infrastructure', 'Backend', 'Distributed Systems'],
    isNew: true,
    isSaved: true,
  },
  {
    id: 'job-2',
    company: 'Meta',
    role: 'Software Engineer',
    category: 'Software Engineering',
    level: 'E5',
    location: 'Menlo Park, CA',
    locationType: 'Hybrid',
    postedDate: '2026-03-08',
    requiredSkills: ['React', 'TypeScript', 'GraphQL', 'System Design'],
    preferredSkills: ['Relay', 'Hack', 'PHP'],
    description:
      'Build the next generation of social experiences for billions of people across Facebook, Instagram, and WhatsApp.',
    responsibilities: [
      'Build high-performance UI components at massive scale',
      'Collaborate with product and design teams',
      'Optimize frontend performance',
      'Ship features to billions of users',
    ],
    fitScore: 82,
    salaryRange: '$210,000 – $290,000',
    applyUrl: 'https://metacareers.com',
    tags: ['Frontend', 'React', 'Scale'],
    isNew: true,
    isSaved: false,
  },
  {
    id: 'job-3',
    company: 'Amazon',
    role: 'Software Development Engineer',
    category: 'Software Engineering',
    level: 'SDE-II',
    location: 'Seattle, WA',
    locationType: 'On-site',
    postedDate: '2026-03-01',
    requiredSkills: ['Java', 'AWS', 'Microservices', 'Data Structures'],
    preferredSkills: ['DynamoDB', 'Lambda', 'SQS', 'Kotlin'],
    description:
      'Build the systems that power Amazon\'s world-class shopping experience and fulfillment network.',
    responsibilities: [
      'Build and operate microservices on AWS',
      'Design for reliability and scalability',
      'Write high-quality, maintainable code',
      'Participate in on-call rotations',
    ],
    fitScore: 74,
    salaryRange: '$175,000 – $240,000',
    applyUrl: 'https://amazon.jobs',
    tags: ['Backend', 'AWS', 'Microservices'],
    isNew: false,
    isSaved: true,
  },
  {
    id: 'job-4',
    company: 'Microsoft',
    role: 'Software Engineer',
    category: 'Software Engineering',
    level: 'Staff',
    location: 'Redmond, WA',
    locationType: 'Hybrid',
    postedDate: '2026-03-03',
    requiredSkills: ['C#', '.NET', 'Azure', 'System Design'],
    preferredSkills: ['TypeScript', 'React', 'Kubernetes'],
    description:
      'Join Microsoft Azure to build the cloud infrastructure that powers modern enterprises worldwide.',
    responsibilities: [
      'Lead architecture decisions for Azure services',
      'Define technical roadmap and strategy',
      'Work closely with customers on complex problems',
      'Drive engineering excellence across teams',
    ],
    fitScore: 65,
    salaryRange: '$200,000 – $280,000',
    applyUrl: 'https://careers.microsoft.com',
    tags: ['Cloud', 'Azure', 'Platform'],
    isNew: false,
    isSaved: false,
  },
  {
    id: 'job-5',
    company: 'Apple',
    role: 'Software Engineer',
    category: 'Software Engineering',
    level: 'Senior',
    location: 'Cupertino, CA',
    locationType: 'On-site',
    postedDate: '2026-02-28',
    requiredSkills: ['Swift', 'Objective-C', 'iOS', 'Performance Engineering'],
    preferredSkills: ['Metal', 'Core Data', 'SwiftUI'],
    description:
      'Create the software experiences that delight hundreds of millions of Apple device users worldwide.',
    responsibilities: [
      'Build framework-level iOS features',
      'Optimize app performance and battery life',
      'Collaborate with hardware teams',
      'Define Apple platform APIs',
    ],
    fitScore: 58,
    salaryRange: '$195,000 – $275,000',
    applyUrl: 'https://jobs.apple.com',
    tags: ['iOS', 'Mobile', 'Frameworks'],
    isNew: false,
    isSaved: false,
  },
  {
    id: 'job-6',
    company: 'Netflix',
    role: 'Software Engineer',
    category: 'Software Engineering',
    level: 'Senior',
    location: 'Los Gatos, CA',
    locationType: 'Remote',
    postedDate: '2026-03-07',
    requiredSkills: ['Java', 'Python', 'Streaming Systems', 'Distributed Systems'],
    preferredSkills: ['Kafka', 'Spark', 'Cassandra', 'Flink'],
    description:
      'Build the systems that deliver seamless streaming to 250+ million subscribers globally.',
    responsibilities: [
      'Design streaming infrastructure at global scale',
      'Improve video encoding and delivery pipelines',
      'Build observability and reliability systems',
      'Drive data-driven decision making',
    ],
    fitScore: 79,
    salaryRange: '$240,000 – $850,000 (RSU-heavy)',
    applyUrl: 'https://jobs.netflix.com',
    tags: ['Streaming', 'Data', 'Backend'],
    isNew: true,
    isSaved: true,
  },
];

// ─── Mock Strategy ─────────────────────────────────────────────────────────

export const mockStrategy: StrategyResult = {
  company: 'Google',
  role: 'Software Engineer',
  level: 'L5',
  timeline: '3 months',
  interviewProcess: [
    {
      stage: 'Recruiter Screen',
      description: 'Initial 30-min call to discuss background, motivations, and logistics.',
      duration: '30 min',
      tips: [
        'Research Googlegeist and recent Google news',
        'Have a crisp 2-minute "tell me about yourself" ready',
        'Know your target level and team preferences',
      ],
    },
    {
      stage: 'Technical Phone Screen',
      description: 'Live coding interview on Google Meet with a shared doc or Coderpad.',
      duration: '45 min',
      tips: [
        'Practice coding in a Google Doc (no IDE)',
        'Think aloud throughout — interviewers value communication',
        'Confirm problem understanding before coding',
        'Ask about edge cases proactively',
      ],
    },
    {
      stage: 'Onsite (Virtual) — Coding x2',
      description: 'Two back-to-back algorithm and data structure interviews.',
      duration: '45 min each',
      tips: [
        'Start with brute force, optimize iteratively',
        'Discuss time and space complexity unprompted',
        'Write clean, readable code',
      ],
    },
    {
      stage: 'Onsite — System Design',
      description: 'Design a large-scale distributed system from scratch.',
      duration: '45 min',
      tips: [
        'Clarify requirements and scale before diving in',
        'Use the RESHADED framework',
        'Draw clear architecture diagrams',
        'Know CAP theorem, consistency models, and trade-offs',
      ],
    },
    {
      stage: 'Onsite — Googliness & Leadership',
      description: 'Behavioral interview focused on past experiences and culture fit.',
      duration: '45 min',
      tips: [
        'Use the STAR format for every answer',
        'Have 5-6 strong stories ready that cover multiple themes',
        'Show data-driven thinking and cross-functional collaboration',
      ],
    },
  ],
  technicalAreas: [
    {
      area: 'Algorithms & Data Structures',
      importance: 'Critical',
      topics: [
        'Arrays, Strings, Hashing',
        'Trees, Graphs, Tries',
        'Dynamic Programming',
        'Binary Search & Two Pointers',
        'Sorting & Searching',
        'Bit Manipulation',
      ],
    },
    {
      area: 'System Design',
      importance: 'Critical',
      topics: [
        'Consistent Hashing',
        'SQL vs NoSQL trade-offs',
        'Caching strategies (CDN, Redis)',
        'Message queues (Kafka, SQS)',
        'Load balancing & rate limiting',
        'Database sharding & replication',
        'Microservices vs Monolith',
      ],
    },
    {
      area: 'Distributed Systems',
      importance: 'High',
      topics: [
        'CAP Theorem',
        'Consensus algorithms (Raft, Paxos)',
        'Eventual consistency',
        'Idempotency & exactly-once delivery',
        'Distributed transactions',
      ],
    },
    {
      area: 'Language Proficiency',
      importance: 'High',
      topics: [
        'Python or Java fluency',
        'Time/space complexity analysis',
        'Memory management basics',
        'Concurrency and threading',
      ],
    },
  ],
  behavioralPrep: {
    framework: 'STAR (Situation, Task, Action, Result)',
    principles: [
      'Googleyness (kindness, collaboration, doing the right thing)',
      'Leadership and ownership',
      'Comfort with ambiguity',
      'Data-driven decision making',
      'Effective cross-functional communication',
    ],
    questions: [
      'Tell me about a time you disagreed with a decision and what you did.',
      'Describe a project where you had to learn something new quickly.',
      'Give an example of leading without authority.',
      'Tell me about your most technically complex project.',
      'How have you handled ambiguous requirements?',
      'Describe a time you improved a process or system significantly.',
    ],
  },
  resumeFocusAreas: [
    'Quantify impact with metrics (e.g., reduced latency by 40%)',
    'Highlight scale (users, data volume, QPS)',
    'Show leadership and mentorship',
    'Feature cross-functional collaboration',
    'Include open source contributions if any',
  ],
  commonMistakes: [
    'Jumping to code without clarifying requirements',
    'Ignoring edge cases until asked',
    'Designing systems without discussing trade-offs',
    'Not thinking about scale from the start',
    'Using vague language in behavioral answers ("we did..." vs "I did...")',
    'Panicking during ambiguous questions — Google values how you think',
  ],
  mockQuestions: [
    {
      type: 'Technical',
      question: 'Given a list of meeting time intervals, find the minimum number of conference rooms required.',
      difficulty: 'Medium',
    },
    {
      type: 'Technical',
      question: 'Implement a LRU cache with O(1) get and O(1) put operations.',
      difficulty: 'Medium',
    },
    {
      type: 'System Design',
      question: 'Design Google Search — from URL input to ranked results.',
      difficulty: 'Hard',
    },
    {
      type: 'System Design',
      question: 'Design YouTube — focus on video upload, storage, and streaming.',
      difficulty: 'Hard',
    },
    {
      type: 'Behavioral',
      question: 'Tell me about a time you had to influence a decision without formal authority.',
      difficulty: 'Medium',
    },
    {
      type: 'Behavioral',
      question: 'Describe a situation where you failed. What did you learn?',
      difficulty: 'Easy',
    },
  ],
  roadmap: [
    {
      week: 'Week 1–2',
      focus: 'Foundation',
      tasks: [
        'Review core data structures: arrays, linked lists, trees, graphs',
        'Solve 20 LeetCode Easy problems',
        'Study hashing and string manipulation patterns',
        'Read "Cracking the Coding Interview" chapters 1–5',
      ],
    },
    {
      week: 'Week 3–4',
      focus: 'Core Algorithms',
      tasks: [
        'Master BFS, DFS, and graph traversal problems',
        'Practice binary search and two-pointer patterns',
        'Solve 15 LeetCode Medium problems',
        'Start dynamic programming fundamentals',
      ],
    },
    {
      week: 'Week 5–6',
      focus: 'Advanced Topics',
      tasks: [
        'Deep dive into dynamic programming (30 problems)',
        'Practice backtracking and recursion',
        'System design study: read Designing Data-Intensive Applications chapters 1–6',
        'Solve 5 LeetCode Hard problems',
      ],
    },
    {
      week: 'Week 7–8',
      focus: 'System Design',
      tasks: [
        'Study 10 classic system design problems (URL shortener, Twitter, Netflix)',
        'Practice drawing architecture diagrams',
        'Learn about distributed systems concepts (CAP, consensus)',
        'Watch System Design Interview videos on YouTube',
      ],
    },
    {
      week: 'Week 9–10',
      focus: 'Behavioral & Communication',
      tasks: [
        'Write out 8 STAR stories from past experiences',
        'Practice talking through code with a partner',
        'Mock interviews x3 (use Pramp or Interviewing.io)',
        'Record yourself explaining a system design',
      ],
    },
    {
      week: 'Week 11–12',
      focus: 'Final Polish',
      tasks: [
        'Full mock interviews x5',
        'Review weakest areas from mock feedback',
        'Refresh resume and tailor to Google L5',
        'Research target teams and prepare questions for interviewers',
      ],
    },
  ],
  resources: [
    { title: 'LeetCode', type: 'Practice', url: 'https://leetcode.com' },
    { title: 'Designing Data-Intensive Applications', type: 'Book' },
    { title: 'Cracking the Coding Interview', type: 'Book' },
    { title: 'System Design Interview (Alex Xu)', type: 'Book' },
    { title: 'NeetCode 150', type: 'Practice', url: 'https://neetcode.io' },
    { title: 'Grokking the System Design Interview', type: 'Course', url: 'https://educative.io' },
    { title: 'Pramp — Peer Mock Interviews', type: 'Practice', url: 'https://pramp.com' },
    { title: 'Interviewing.io', type: 'Practice', url: 'https://interviewing.io' },
  ],
};

// ─── Starter Prompts ──────────────────────────────────────────────────────────

export const starterPrompts: StarterPrompt[] = [
  {
    label: 'Google L5 prep',
    prompt: 'How do I prepare for Google L5?',
  },
  {
    label: 'Amazon leadership principles',
    prompt: "What's the Amazon leadership principle interview like?",
  },
  {
    label: 'Meta E5 strategy',
    prompt: 'Review my strategy for Meta E5',
  },
  {
    label: 'Microsoft Staff skills',
    prompt: 'What skills do I need for Microsoft Staff Engineer?',
  },
];

// ─── Mock AI Chat Responses ────────────────────────────────────────────────────

export const mockAIResponses: Record<string, string> = {
  default: `Great question! As a MAANG Career Coach, I can help you craft a targeted preparation strategy.

Here's what I'd recommend:

1. **Understand the level expectations** — Each company has nuanced rubrics. L5 at Google, E5 at Meta, and SDE-II at Amazon all require strong ownership and cross-team impact.

2. **Focus on fundamentals** — Algorithms, data structures, and system design are non-negotiable at this level.

3. **Practice behavioral stories** — Every MAANG company uses behavioral interviews. Prepare 6–8 STAR stories that can flex across themes.

4. **Mock interviews** — Use Pramp or Interviewing.io to simulate real pressure. Aim for 5+ mocks before your actual interview.

Would you like a more specific plan for a particular company or role?`,

  google: `**Preparing for Google L5 — here's your game plan:**

Google L5 is equivalent to a Senior Software Engineer. The bar is high but very achievable with focused prep.

**What Google looks for:**
- Strong algorithmic thinking (LeetCode Medium/Hard fluency)
- System design at scale (design for 100M+ users)
- Googleyness — kindness, ambiguity tolerance, collaboration
- Leadership — you should be able to lead projects, not just tasks

**3-Month Timeline:**
- Month 1: Algorithms deep dive — 150 LeetCode problems, focus on graphs, DP, trees
- Month 2: System design — read DDIA, practice 10 classic designs
- Month 3: Mock interviews + behavioral stories + resume polish

**Top resources:** NeetCode 150, Designing Data-Intensive Applications, System Design Interview by Alex Xu

Want me to generate a day-by-day study plan?`,

  amazon: `**Amazon Leadership Principle Interviews — what to expect:**

Amazon's behavioral interviews are deeply intertwined with their 16 Leadership Principles (LPs). Every question maps to one or more LPs.

**The most commonly tested LPs:**
- Customer Obsession
- Ownership
- Dive Deep
- Deliver Results
- Invent and Simplify
- Earn Trust

**How to prepare:**
1. Write 2 stories per LP (you can often reuse stories across principles)
2. Use the STAR format, but Amazon also loves metrics
3. Be specific — "I improved system reliability" < "I reduced P99 latency from 800ms to 120ms"
4. Show personal ownership: say "I" not "we"

**Common question themes:** conflict with a teammate, failing a project, working with limited data, delivering under pressure

Would you like sample questions with example answers for any specific LP?`,

  meta: `**Meta E5 Interview Strategy — detailed breakdown:**

Meta E5 maps to Senior Engineer and requires demonstrated scope of impact.

**Meta's interview format:**
1. Coding (2 rounds) — medium/hard algorithms, focus on clean code
2. System Design (1 round) — design for Meta-scale (billions of users)
3. Behavioral (1 round) — focus on cross-functional collaboration and impact

**What sets Meta apart:**
- They care deeply about *impact* — not just what you built, but metrics
- Move fast culture — show you can ship iteratively and learn from data
- Product thinking — even engineers need to understand the "why"

**System Design tips for Meta:**
- Think about feed ranking, social graphs, and real-time systems
- Discuss consistency vs. availability trade-offs
- Show awareness of CDN, caching layers, and database partitioning

Want me to do a mock system design session for "Design Facebook News Feed"?`,

  microsoft: `**Skills needed for Microsoft Staff Engineer:**

Microsoft's Staff Engineer (L65/Principal equivalent) is a senior IC role requiring technical leadership and broad influence.

**Technical skills expected:**
- Deep expertise in at least one domain (cloud, distributed systems, AI/ML, etc.)
- System design proficiency — design cloud-native, Azure-based architectures
- Language fluency — C#, TypeScript, Python, or Go are most common
- Security and privacy awareness (Microsoft is very compliance-focused)

**Soft skills / leadership:**
- Ability to drive technical vision for a product area
- Experience influencing without authority across teams
- Customer and partner empathy (Microsoft is very enterprise-focused)
- Strong written communication (design docs, RFCs)

**Interview format:** Coding + System Design + Role-specific (behavioral & leadership)

**Recommended prep:** Focus on cloud architecture patterns, distributed systems, and Microsoft's Azure services. Leetcode still matters but system design is weighted heavily at this level.

Want a customized prep plan for a specific Microsoft team?`,
};
