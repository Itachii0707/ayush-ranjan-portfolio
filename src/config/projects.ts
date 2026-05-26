export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'cv' | 'ai-ml' | 'web' | 'tools' | 'all';
  categories: string[];
  challenge: string;
  results: string;
  github?: string;
  live?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  year: number;
}

export const projects: Project[] = [
  {
    id: 'gesture-virtual-mouse',
    title: 'Gesture-Controlled Virtual Mouse',
    description:
      'A real-time hand gesture recognition system that replaces physical mouse input using computer vision and landmark detection.',
    longDescription:
      'Built a hands-free virtual mouse controller using MediaPipe Hands and OpenCV. The system tracks 21 hand landmarks in real-time at 30+ FPS, interprets gestures to control cursor movement, left/right click, scroll, and drag operations. Uses a Kalman filter for smooth cursor motion and a custom gesture classifier for accurate intent recognition.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'PyAutoGUI'],
    category: 'cv',
    categories: ['cv', 'ai-ml'],
    challenge:
      'Achieving sub-20ms latency while maintaining 95%+ gesture classification accuracy across varying lighting and skin tones.',
    results:
      '30+ FPS real-time tracking, 95% gesture accuracy, sub-20ms response latency, zero-hardware input replacement.',
    github: 'https://github.com/Itachii0707',
    featured: true,
    status: 'completed',
    year: 2024,
  },
  {
    id: 'ai-attendance-system',
    title: 'AI Face Recognition Attendance System',
    description:
      'Automated attendance management using deep learning face recognition — contactless, fast, and accurate.',
    longDescription:
      'Developed an end-to-end attendance system leveraging face embeddings with a FaceNet-based model. The system registers students once, then recognizes them in real-time from a camera feed, marks attendance in a database, and generates downloadable reports. Includes an admin dashboard for management.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'FaceNet', 'SQLite', 'Flask'],
    category: 'ai-ml',
    categories: ['ai-ml', 'cv'],
    challenge:
      'Handling variations in lighting, face angles, and occlusions while keeping false acceptance rate below 1%.',
    results:
      '98% recognition accuracy, 3-second average mark time, processes 50+ students per minute.',
    github: 'https://github.com/Itachii0707',
    featured: true,
    status: 'completed',
    year: 2024,
  },
  {
    id: 'object-detection-dashboard',
    title: 'Real-Time Object Detection Dashboard',
    description:
      'A web-based real-time object detection system using YOLOv8 with a live analytics dashboard.',
    longDescription:
      'Integrated YOLOv8 for real-time multi-class object detection via webcam or video upload. Built a React + FastAPI dashboard showing detection confidence scores, class distribution charts, FPS metrics, and bounding box overlays. Supports custom model fine-tuning via a simple upload interface.',
    techStack: ['Python', 'YOLOv8', 'FastAPI', 'React', 'OpenCV', 'WebSockets'],
    category: 'cv',
    categories: ['cv', 'ai-ml', 'web'],
    challenge:
      'Streaming high-FPS annotated video over WebSockets while maintaining dashboard responsiveness.',
    results:
      '25+ FPS with YOLOv8n, 80-class detection, live dashboard with <100ms chart update latency.',
    github: 'https://github.com/Itachii0707',
    featured: true,
    status: 'completed',
    year: 2025,
  },
  {
    id: 'generative-ai-toolkit',
    title: 'Generative AI Experiments Toolkit',
    description:
      'A collection of generative AI experiments including text-to-image, style transfer, and prompt engineering benchmarks.',
    longDescription:
      'Built a personal research toolkit exploring diffusion models, GANs, and prompt engineering. Includes custom LoRA fine-tuning scripts, a CLI for batch generation, style transfer with neural style transfer algorithms, and a benchmark suite comparing prompt strategies across models.',
    techStack: ['Python', 'Diffusers', 'Hugging Face', 'LoRA', 'PyTorch', 'Gradio'],
    category: 'ai-ml',
    categories: ['ai-ml'],
    challenge:
      'Fine-tuning diffusion models on consumer hardware (8GB VRAM) while preserving generation quality.',
    results:
      'LoRA fine-tuning in <2 hours on RTX 3070, 40% style coherence improvement over baseline.',
    github: 'https://github.com/Itachii0707',
    featured: false,
    status: 'completed',
    year: 2025,
  },
];
