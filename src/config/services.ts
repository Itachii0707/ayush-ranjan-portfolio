export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  pricing: 'custom' | 'fixed';
  startingFrom?: string;
}

export const services: Service[] = [
  {
    id: 'ai-development',
    title: 'AI Development',
    description:
      'End-to-end AI system design and development — from problem framing to deployed, production-ready models.',
    features: [
      'Custom ML model development',
      'Model fine-tuning and optimization',
      'AI pipeline architecture',
      'Model evaluation and benchmarking',
      'LLM integration and prompt engineering',
    ],
    icon: '🧠',
    color: 'cyan',
    pricing: 'custom',
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision Systems',
    description:
      'Real-time vision systems for detection, recognition, tracking, and analysis using state-of-the-art CV stacks.',
    features: [
      'Object detection & tracking',
      'Face recognition systems',
      'Gesture & pose estimation',
      'Video analytics pipelines',
      'Edge deployment optimization',
    ],
    icon: '👁️',
    color: 'violet',
    pricing: 'custom',
  },
  {
    id: 'fullstack-development',
    title: 'Full-Stack Development',
    description:
      'Modern, performant web applications built with cutting-edge frameworks and clean, scalable architecture.',
    features: [
      'Next.js / React applications',
      'REST & GraphQL APIs',
      'Database design (PostgreSQL, Supabase)',
      'Authentication & authorization',
      'Vercel / cloud deployment',
    ],
    icon: '🌐',
    color: 'cyan',
    pricing: 'custom',
  },
  {
    id: 'automation',
    title: 'Automation Solutions',
    description:
      'Intelligent automation pipelines that eliminate manual workflows and save hundreds of engineering hours.',
    features: [
      'Python scripting & automation',
      'Data scraping & ETL pipelines',
      'Process automation bots',
      'CI/CD pipeline setup',
      'Scheduled task systems',
    ],
    icon: '⚙️',
    color: 'violet',
    pricing: 'custom',
  },
  {
    id: 'uiux-engineering',
    title: 'UI/UX Engineering',
    description:
      'Premium, conversion-focused interfaces that combine aesthetic excellence with engineering precision.',
    features: [
      'Design system creation',
      'Interactive motion & animation',
      'Responsive & accessible UI',
      'Component library development',
      'Performance optimization',
    ],
    icon: '✨',
    color: 'cyan',
    pricing: 'custom',
  },
  {
    id: 'ml-consulting',
    title: 'ML Consulting',
    description:
      'Strategic AI/ML consulting for teams looking to adopt intelligent systems or improve existing ML workflows.',
    features: [
      'AI strategy and roadmapping',
      'Model architecture review',
      'Dataset strategy and annotation',
      'MLOps setup and tooling',
      'Code reviews and best practices',
    ],
    icon: '📊',
    color: 'violet',
    pricing: 'custom',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Deep-dive into your problem space, goals, and technical requirements.',
  },
  {
    step: '02',
    title: 'Architecture',
    description: 'Design the optimal technical approach, stack selection, and system blueprint.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Iterative development with regular checkpoints, demos, and feedback loops.',
  },
  {
    step: '04',
    title: 'Deploy',
    description: 'Production deployment, testing, monitoring, and documentation handoff.',
  },
];
