import { Badge, Resource, LeaderboardEntry, DailyChallenge } from '@/types';

export const PROGRAM_INFO = {
  paramedicine: {
    title: 'Paramedicine (B.Sc. P)',
    shortTitle: 'Paramedicine',
    description: 'Prepare for emergency care roles with hands-on simulation training, advanced life support protocols, and real-world clinical rotations.',
    icon: 'Ambulance',
    color: 'hsl(var(--destructive))',
  },
  nursing: {
    title: 'Nursing (B.Sc. N)',
    shortTitle: 'Nursing',
    description: 'Become a registered nurse leader through comprehensive clinical education, patient care excellence, and evidence-based practice.',
    icon: 'Heart',
    color: 'hsl(var(--primary))',
  },
  radiography: {
    title: 'Medical Radiography (B.Sc. MR)',
    shortTitle: 'Medical Radiography',
    description: 'Master imaging technology with advanced radiology software, diagnostic techniques, and cutting-edge medical imaging equipment.',
    icon: 'Scan',
    color: 'hsl(var(--accent))',
  },
};

export const AVAILABLE_BADGES: Badge[] = [
  { id: 'collaborator', name: 'Collaborator Badge', description: 'Complete 3 peer reviews', icon: 'Users' },
  { id: 'early-bird', name: 'Early Bird', description: 'Log in before 8 AM', icon: 'Sun' },
  { id: 'streak-master', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: 'Flame' },
  { id: 'resource-explorer', name: 'Resource Explorer', description: 'Access 10 different resources', icon: 'BookOpen' },
  { id: 'forum-champion', name: 'Forum Champion', description: 'Post 5 forum discussions', icon: 'MessageSquare' },
];

export const MOCK_RESOURCES: Resource[] = [
  // Paramedicine
  { id: 'p1', title: 'Emergency Care Protocols', description: 'LMS course materials for emergency response', type: 'lms', program: 'paramedicine', url: '#', pinned: true, icon: 'BookOpen' },
  { id: 'p2', title: 'Sim Lab Scheduler', description: 'Book your simulation lab sessions', type: 'calendar', program: 'paramedicine', url: '#', pinned: false, icon: 'Calendar' },
  { id: 'p3', title: 'Paramedicine Resources', description: 'Shared Google Drive folder', type: 'drive', program: 'paramedicine', url: '#', pinned: false, icon: 'Folder' },
  { id: 'p4', title: 'Peer Discussion Forum', description: 'Collaborate with fellow students', type: 'forum', program: 'paramedicine', url: '#', pinned: false, icon: 'MessageSquare' },
  
  // Nursing
  { id: 'n1', title: 'Clinical Rotation Tools', description: 'Track and manage clinical placements', type: 'lms', program: 'nursing', url: '#', pinned: true, icon: 'Stethoscope' },
  { id: 'n2', title: 'Peer Review Forum', description: 'Share and review case studies', type: 'forum', program: 'nursing', url: '#', pinned: false, icon: 'MessageSquare' },
  { id: 'n3', title: 'Study Guides Library', description: 'Comprehensive nursing study materials', type: 'drive', program: 'nursing', url: '#', pinned: false, icon: 'FileText' },
  { id: 'n4', title: 'Skills Lab Booking', description: 'Reserve nursing skills lab time', type: 'calendar', program: 'nursing', url: '#', pinned: false, icon: 'Calendar' },
  
  // Radiography
  { id: 'r1', title: 'Radiology Software Access', description: 'PACS and imaging software portal', type: 'software', program: 'radiography', url: '#', pinned: true, icon: 'Monitor' },
  { id: 'r2', title: 'Case Study Database', description: 'Browse diagnostic imaging cases', type: 'lms', program: 'radiography', url: '#', pinned: false, icon: 'Database' },
  { id: 'r3', title: 'Equipment Booking', description: 'Reserve imaging equipment', type: 'calendar', program: 'radiography', url: '#', pinned: false, icon: 'Calendar' },
  { id: 'r4', title: 'Imaging Techniques Guide', description: 'Best practices and protocols', type: 'drive', program: 'radiography', url: '#', pinned: false, icon: 'FileImage' },
  
  // All programs
  { id: 'a1', title: 'LMS Dashboard', description: 'Access all your courses', type: 'lms', program: 'all', url: '#', pinned: true, icon: 'GraduationCap' },
  { id: 'a2', title: 'Shared Resources', description: 'College-wide resource library', type: 'drive', program: 'all', url: '#', pinned: false, icon: 'FolderOpen' },
  { id: 'a3', title: 'Collaboration Forum', description: 'Cross-program discussions', type: 'forum', program: 'all', url: '#', pinned: false, icon: 'Users' },
  { id: 'a4', title: 'Faculty Announcements', description: 'Latest updates from faculty', type: 'announcement', program: 'all', url: '#', pinned: true, icon: 'Bell' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'StudentA', points: 520 },
  { rank: 2, username: 'StudentB', points: 485 },
  { rank: 3, username: 'StudentC', points: 450 },
  { rank: 4, username: 'StudentD', points: 420 },
  { rank: 5, username: 'StudentE', points: 395 },
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  { id: 'dc1', title: 'Daily Login', description: 'Log in today for bonus points!', points: 10, completed: false },
  { id: 'dc2', title: 'Access a Resource', description: 'Open any learning resource', points: 5, completed: false },
  { id: 'dc3', title: 'Visit the Forum', description: 'Check the collaboration forum', points: 5, completed: false },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'Spring 2026 Registration Open', date: '2026-01-15', content: 'Course registration for Spring 2026 is now available.' },
  { id: '2', title: 'Clinical Placement Updates', date: '2026-01-10', content: 'New clinical sites added for nursing students.' },
  { id: '3', title: 'Equipment Maintenance', date: '2026-01-08', content: 'Radiology lab will be closed for maintenance on Jan 20.' },
];
