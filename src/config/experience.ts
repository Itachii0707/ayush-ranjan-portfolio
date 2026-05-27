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

export interface TimelineEvent {
  id: string;
  year: string;
  month: string;
  title: string;
  organization: string;
  description: string;
  type: 'certification' | 'hackathon' | 'milestone';
  icon: string;
  link?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'nvidia-dl',
    year: '2024',
    month: 'Dec',
    title: 'Fundamentals of Deep Learning Certification',
    organization: 'NVIDIA Deep Learning Institute',
    description: 'Trained and deployed deep learning models for computer vision and sequential data, optimizing networks for GPU acceleration.',
    type: 'certification',
    icon: '🧠',
  },
  {
    id: 'hackathon-win',
    year: '2024',
    month: 'Oct',
    title: '1st Place Winner - AI Hackathon',
    organization: 'MSRUAS Technical Club',
    description: 'Designed and engineered a contactless gesture-controlled computer vision controller for accessibility, achieving 98% accuracy.',
    type: 'hackathon',
    icon: '🏆',
  },
  {
    id: 'tf-dev',
    year: '2024',
    month: 'Jul',
    title: 'TensorFlow Developer Specialization',
    organization: 'DeepLearning.AI',
    description: 'Acquired master-level training in building ML models, convolutional networks, natural language processing, and sequence forecasting.',
    type: 'certification',
    icon: '🤖',
  },
  {
    id: 'cv-pipeline',
    year: '2024',
    month: 'Mar',
    title: 'Open Source CV Contribution',
    organization: 'GitHub Community',
    description: 'Contributed highly optimized custom OpenCV object tracking pipelines to a popular public robotics repository, reducing CPU overhead by 22%.',
    type: 'milestone',
    icon: '🔧',
  },
  {
    id: 'research-assistant',
    year: '2023',
    month: 'Nov',
    title: 'University CV Lab Assistant',
    organization: 'MSRUAS Computer Vision Group',
    description: 'Assisted in training custom YOLOv8 models for real-time traffic detection and flow analysis inside simulated smart-city intersections.',
    type: 'milestone',
    icon: '👁️',
  }
];
