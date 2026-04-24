export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Remote';
  salary: string;
  match: number;
  tags: string[];
  posted: string;
  saved: boolean;
  applied: boolean;
  description: string;
}

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior Product Designer',
    company: 'Pulse Creative',
    location: 'Remote',
    type: 'Full-time',
    salary: '$105K – $125K',
    match: 91,
    tags: ['Figma', 'UX Research', 'Design Systems'],
    posted: '2 days ago',
    saved: false,
    applied: false,
    description: 'Lead product design for a Series B fintech platform. Own the full design lifecycle from discovery to delivery.',
  },
  {
    id: 'j2',
    title: 'UX/UI Designer',
    company: 'NovaTech Solutions',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90K – $110K',
    match: 87,
    tags: ['Figma', 'Prototyping', 'User Testing'],
    posted: '1 day ago',
    saved: true,
    applied: false,
    description: 'Design intuitive interfaces for enterprise SaaS products. Collaborate with engineers and product managers daily.',
  },
  {
    id: 'j3',
    title: 'Product Manager — Growth',
    company: 'Skyline Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120K – $145K',
    match: 82,
    tags: ['Product Strategy', 'Growth', 'Analytics'],
    posted: '3 days ago',
    saved: false,
    applied: true,
    description: 'Drive user acquisition and retention strategies for a consumer app with 500K MAU.',
  },
  {
    id: 'j4',
    title: 'Brand Designer',
    company: 'Meridian Agency',
    location: 'Remote',
    type: 'Contract',
    salary: '$65/hr',
    match: 79,
    tags: ['Branding', 'Illustrator', 'Motion'],
    posted: '4 days ago',
    saved: false,
    applied: false,
    description: 'Create cohesive brand identities for mid-market clients. Contract role with potential to convert to full-time.',
  },
  {
    id: 'j5',
    title: 'Design Lead',
    company: 'Foundry Digital',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$130K – $155K',
    match: 76,
    tags: ['Leadership', 'Strategy', 'Figma'],
    posted: '1 week ago',
    saved: true,
    applied: false,
    description: 'Lead a team of 4 designers. Define design culture and processes at a growing product studio.',
  },
  {
    id: 'j6',
    title: 'UX Researcher',
    company: 'ClearPath Health',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85K – $100K',
    match: 72,
    tags: ['User Research', 'Usability Testing', 'Healthcare'],
    posted: '5 days ago',
    saved: false,
    applied: false,
    description: 'Conduct qualitative and quantitative research to guide product decisions at a health tech startup.',
  },
];
