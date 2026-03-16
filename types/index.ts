// ─── Core Types ────────────────────────────────────────────────────────────

export type Company = 'Google' | 'Amazon' | 'Meta' | 'Apple' | 'Netflix' | 'Microsoft';

export type Level = 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | 'IC3' | 'IC4' | 'IC5' | 'E4' | 'E5' | 'E6' | 'SDE-I' | 'SDE-II' | 'SDE-III' | 'Senior' | 'Staff' | 'Principal';

export type JobType = 'Full-time' | 'Contract' | 'Internship';

export type JobCategory =
  | 'Software Engineering'
  | 'Machine Learning'
  | 'Data Science'
  | 'Product Management'
  | 'Design'
  | 'DevOps / SRE'
  | 'Security'
  | 'Data Engineering';

// ─── User ──────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  location: string;
  yearsOfExperience: number;
  education: Education[];
  skills: string[];
  targetCompanies: Company[];
  targetRoles: string[];
  resumeSummary: string;
  profileCompleteness: number; // 0-100
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  year: string;
}

// ─── Jobs ──────────────────────────────────────────────────────────────────

export interface Job {
  id: string;
  company: Company;
  role: string;
  category: JobCategory;
  level: string;
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  postedDate: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  responsibilities: string[];
  fitScore: number; // 0-100
  salaryRange?: string;
  applyUrl: string;
  tags: string[];
  isNew?: boolean;
  isSaved?: boolean;
}

// ─── Strategy ──────────────────────────────────────────────────────────────

export interface StrategyQuery {
  company: Company;
  role: string;
  level: string;
  timeline: '2 weeks' | '1 month' | '3 months';
}

export interface StrategyResult {
  company: Company;
  role: string;
  level: string;
  timeline: string;
  interviewProcess: InterviewStage[];
  technicalAreas: PrepArea[];
  behavioralPrep: BehavioralPrep;
  resumeFocusAreas: string[];
  commonMistakes: string[];
  mockQuestions: MockQuestion[];
  roadmap: RoadmapWeek[];
  resources: Resource[];
}

export interface InterviewStage {
  stage: string;
  description: string;
  duration: string;
  tips: string[];
}

export interface PrepArea {
  area: string;
  importance: 'Critical' | 'High' | 'Medium';
  topics: string[];
}

export interface BehavioralPrep {
  framework: string;
  principles: string[];
  questions: string[];
}

export interface MockQuestion {
  type: 'Technical' | 'Behavioral' | 'System Design';
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface RoadmapWeek {
  week: string;
  focus: string;
  tasks: string[];
}

export interface Resource {
  title: string;
  type: 'Book' | 'Course' | 'Practice' | 'Article';
  url?: string;
}

// ─── Chat ──────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface StarterPrompt {
  label: string;
  prompt: string;
}

// ─── Navigation ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
