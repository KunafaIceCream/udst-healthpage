export type Program = 'paramedicine' | 'nursing' | 'radiography';

export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  program: Program;
  avatar?: string;
  streak: number;
  points: number;
  badges: Badge[];
  resourcesAccessed: string[];
  collaborations: number;
  lastLogin: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'lms' | 'drive' | 'forum' | 'calendar' | 'software' | 'announcement';
  program: Program | 'all';
  url: string;
  pinned: boolean;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface FeedbackForm {
  rating: number;
  feedback: string;
  category: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}
