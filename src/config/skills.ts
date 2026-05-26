export interface Skill {
  name: string;
  category: string;
  level: number; // 1-100
  icon?: string;
}

export const skillCategories = [
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    color: 'cyan',
    skills: [
      { name: 'Computer Vision', level: 90 },
      { name: 'Deep Learning', level: 85 },
      { name: 'TensorFlow', level: 80 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Generative AI', level: 75 },
      { name: 'NLP', level: 65 },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    color: 'violet',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'TypeScript', level: 72 },
      { name: 'JavaScript', level: 75 },
      { name: 'SQL', level: 70 },
      { name: 'C++', level: 55 },
    ],
  },
  {
    id: 'cv-tools',
    label: 'CV & Vision Tools',
    color: 'cyan',
    skills: [
      { name: 'OpenCV', level: 90 },
      { name: 'MediaPipe', level: 85 },
      { name: 'YOLOv8', level: 80 },
      { name: 'PyTorch', level: 72 },
      { name: 'Hugging Face', level: 70 },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    color: 'violet',
    skills: [
      { name: 'React / Next.js', level: 78 },
      { name: 'FastAPI', level: 75 },
      { name: 'Flask', level: 78 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'REST APIs', level: 82 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Practices',
    color: 'cyan',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 60 },
      { name: 'Linux / CLI', level: 75 },
      { name: 'VS Code', level: 90 },
      { name: 'Jupyter Notebooks', level: 88 },
    ],
  },
  {
    id: 'soft',
    label: 'Professional',
    color: 'violet',
    skills: [
      { name: 'Problem Solving', level: 92 },
      { name: 'Team Collaboration', level: 85 },
      { name: 'Time Management', level: 80 },
      { name: 'Technical Communication', level: 75 },
      { name: 'Research & Learning', level: 90 },
    ],
  },
];

export const interests = [
  { name: 'Formula 1', emoji: '🏎️', description: 'Race strategy, engineering, and aerodynamics' },
  { name: 'Badminton', emoji: '🏸', description: 'Competitive court sport and reflexes training' },
  { name: 'Football', emoji: '⚽', description: 'Team dynamics and tactical positioning' },
  { name: 'Strategic Gaming', emoji: '🎮', description: 'Complex strategy games and decision-making' },
  { name: 'Tech Innovation', emoji: '🚀', description: 'Following breakthroughs in AI and computing' },
];
