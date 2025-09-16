import { Gig, Project, Transaction } from './types';

export const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'React Developer for E-commerce Site',
    description: 'Looking for an experienced React developer to build a modern e-commerce platform with Next.js and TypeScript.',
    skillsRequired: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    clientInfo: {
      name: 'TechStart Inc.',
      avatar: '👨‍💼',
      rating: 4.8,
    },
    paymentTerms: {
      amount: 75,
      currency: 'USD',
      type: 'hourly',
    },
    location: 'Remote',
    postedDate: new Date('2024-01-15'),
    applicationDeadline: new Date('2024-02-01'),
    category: 'Development',
  },
  {
    id: '2',
    title: 'UI/UX Design for Mobile App',
    description: 'Need a talented designer to create intuitive user interfaces for our fitness tracking mobile application.',
    skillsRequired: ['Figma', 'UI Design', 'Mobile Design', 'Prototyping'],
    clientInfo: {
      name: 'FitLife Studios',
      avatar: '🏃‍♀️',
      rating: 4.9,
    },
    paymentTerms: {
      amount: 2500,
      currency: 'USD',
      type: 'fixed',
    },
    location: 'Remote',
    postedDate: new Date('2024-01-14'),
    applicationDeadline: new Date('2024-01-30'),
    category: 'Design',
  },
  {
    id: '3',
    title: 'Content Writer for Tech Blog',
    description: 'Seeking a skilled content writer to create engaging articles about emerging technologies and software development.',
    skillsRequired: ['Technical Writing', 'SEO', 'Research', 'Content Strategy'],
    clientInfo: {
      name: 'DevInsights',
      avatar: '📝',
      rating: 4.7,
    },
    paymentTerms: {
      amount: 150,
      currency: 'USD',
      type: 'fixed',
    },
    location: 'Remote',
    postedDate: new Date('2024-01-13'),
    applicationDeadline: new Date('2024-01-28'),
    category: 'Writing',
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    gigId: '1',
    userId: 'user1',
    clientName: 'TechStart Inc.',
    status: 'active',
    startDate: new Date('2024-01-10'),
    agreedPayment: 3000,
    title: 'E-commerce Platform Development',
  },
  {
    id: '2',
    userId: 'user1',
    clientName: 'Local Restaurant',
    status: 'completed',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-08'),
    agreedPayment: 800,
    title: 'Website Redesign',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    projectId: '2',
    amount: 800,
    date: new Date('2024-01-08'),
    type: 'income',
    description: 'Website Redesign Payment',
    category: 'Project Payment',
  },
  {
    id: '2',
    amount: 50,
    date: new Date('2024-01-05'),
    type: 'expense',
    description: 'Design Software Subscription',
    category: 'Tools',
  },
  {
    id: '3',
    projectId: '1',
    amount: 1200,
    date: new Date('2024-01-12'),
    type: 'income',
    description: 'E-commerce Development - Milestone 1',
    category: 'Project Payment',
  },
];
