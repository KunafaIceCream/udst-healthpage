import { Stethoscope, BookOpen, Coffee, Award, Ticket, FileText, Users, Heart } from 'lucide-react';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'academic' | 'wellness' | 'experience' | 'merchandise';
  icon: string;
  available: boolean;
  limitedQuantity?: number;
}

export const REWARDS: Reward[] = [
  {
    id: 'sim-lab-priority',
    name: 'Priority Sim Lab Booking',
    description: 'Get priority access to book simulation lab sessions for one week.',
    pointsCost: 100,
    category: 'academic',
    icon: 'Stethoscope',
    available: true,
  },
  {
    id: 'study-guide-bundle',
    name: 'Premium Study Guide Bundle',
    description: 'Unlock exclusive study materials and exam prep guides for your program.',
    pointsCost: 75,
    category: 'academic',
    icon: 'BookOpen',
    available: true,
  },
  {
    id: 'coffee-voucher',
    name: 'Campus Café Voucher',
    description: 'Redeem for a free coffee or snack at the UDST campus café.',
    pointsCost: 50,
    category: 'wellness',
    icon: 'Coffee',
    available: true,
    limitedQuantity: 20,
  },
  {
    id: 'certificate-recognition',
    name: 'Digital Recognition Certificate',
    description: 'Receive a shareable certificate recognizing your engagement achievements.',
    pointsCost: 150,
    category: 'experience',
    icon: 'Award',
    available: true,
  },
  {
    id: 'guest-lecture-pass',
    name: 'VIP Guest Lecture Pass',
    description: 'Reserved front-row seating at the next Health Sciences guest lecture.',
    pointsCost: 120,
    category: 'experience',
    icon: 'Ticket',
    available: true,
    limitedQuantity: 10,
  },
  {
    id: 'clinical-case-access',
    name: 'Extended Case Study Access',
    description: 'One month of access to the advanced clinical case study database.',
    pointsCost: 200,
    category: 'academic',
    icon: 'FileText',
    available: true,
  },
  {
    id: 'peer-mentor-session',
    name: 'Peer Mentoring Session',
    description: 'Book a one-on-one session with a senior student mentor in your field.',
    pointsCost: 80,
    category: 'academic',
    icon: 'Users',
    available: true,
  },
  {
    id: 'wellness-workshop',
    name: 'Wellness Workshop Pass',
    description: 'Free entry to the next healthcare professional wellness workshop.',
    pointsCost: 60,
    category: 'wellness',
    icon: 'Heart',
    available: true,
    limitedQuantity: 15,
  },
];

export const REWARD_CATEGORIES = [
  { id: 'all', label: 'All Rewards' },
  { id: 'academic', label: 'Academic' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'experience', label: 'Experiences' },
];
