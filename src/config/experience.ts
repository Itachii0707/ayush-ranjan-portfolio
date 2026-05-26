export interface ExperienceItem {
  id: string;
  type: 'education' | 'work' | 'research' | 'achievement';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'M S Ramaiah University Of Applied Sciences',
    location: 'Bengaluru, Karnataka',
    startDate: 'Nov 2022',
    endDate: 'Nov 2026',
    current: true,
    grade: 'Pursuing',
    highlights: [
      'Specialization in AI, ML, and Computer Vision',
      'Active member of technical clubs',
      'Worked on multiple research-adjacent projects',
    ],
  },
  {
    id: 'class12',
    degree: 'Class 12th — Science (PCM + CS)',
    institution: 'Kendriya Vidyalaya Hebbal',
    location: 'Bengaluru, Karnataka',
    startDate: 'Apr 2021',
    endDate: 'Jun 2022',
    current: false,
    grade: 'Completed',
    highlights: [
      'Physics, Chemistry, Mathematics + Computer Science',
      'Built first programming projects in Python',
    ],
  },
  {
    id: 'class10',
    degree: 'Class 10th — CBSE',
    institution: 'Kendriya Vidyalaya Sector 31',
    location: 'Chandigarh',
    startDate: 'Apr 2019',
    endDate: 'Jun 2020',
    current: false,
    grade: 'Completed',
    highlights: ['Strong foundation in mathematics and sciences'],
  },
];

export const achievements = [
  {
    id: 'cv-expert',
    title: 'Computer Vision Expert',
    description: 'Built multiple production-ready CV systems with 95%+ accuracy metrics',
    icon: '👁️',
  },
  {
    id: 'ai-builder',
    title: 'AI Systems Builder',
    description: 'Developed and deployed ML pipelines from data collection to inference',
    icon: '🤖',
  },
  {
    id: 'open-source',
    title: 'Open Source Contributor',
    description: 'Active GitHub contributor with multiple public repositories',
    icon: '🔧',
  },
  {
    id: 'fast-learner',
    title: 'Rapid Technology Adoption',
    description: 'Quickly masters new frameworks and tools across the AI/ML ecosystem',
    icon: '⚡',
  },
];
