export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

// Flat structure matching CommandPalette's filter/group logic
export const commandPaletteItems = [
  // Navigation group
  { id: 'nav-home', group: 'Navigation', label: 'Go to Home', href: '/', keywords: ['home', 'start'] },
  { id: 'nav-about', group: 'Navigation', label: 'Go to About', href: '/about', keywords: ['about', 'bio'] },
  { id: 'nav-projects', group: 'Navigation', label: 'Go to Projects', href: '/projects', keywords: ['projects', 'work'] },
  { id: 'nav-experience', group: 'Navigation', label: 'Go to Experience', href: '/experience', keywords: ['experience', 'career'] },
  { id: 'nav-services', group: 'Navigation', label: 'Go to Services', href: '/services', keywords: ['services', 'hire'] },
  { id: 'nav-contact', group: 'Navigation', label: 'Go to Contact', href: '/contact', keywords: ['contact', 'reach'] },
  { id: 'nav-resume', group: 'Navigation', label: 'View Resume', href: '/resume', keywords: ['resume', 'cv'] },
  // Quick Actions group
  { id: 'action-github', group: 'Quick Actions', label: 'Open GitHub', href: 'https://github.com/Itachii0707', external: true, keywords: ['github', 'code'] },
  { id: 'action-linkedin', group: 'Quick Actions', label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/ayush-ranjan-62628a3b2/', external: true, keywords: ['linkedin'] },
  { id: 'action-email', group: 'Quick Actions', label: 'Send Email', href: 'mailto:ayush25252@flash.co', external: true, keywords: ['email', 'mail'] },
];
