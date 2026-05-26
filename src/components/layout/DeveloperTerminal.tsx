'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  projects   — View my projects',
    '  skills     — List my tech skills',
    '  contact    — Get contact info',
    '  github     — Open GitHub profile',
    '  resume     — Download resume',
    '  clear      — Clear terminal',
    '  help       — Show this message',
  ],
  projects: [
    'Projects:',
    '  [1] Gesture-Controlled Virtual Mouse  — Python, OpenCV, MediaPipe',
    '  [2] AI Face Recognition Attendance   — TensorFlow, FaceNet, Flask',
    '  [3] Real-Time Object Detection       — YOLOv8, FastAPI, WebSockets',
    '  [4] Generative AI Experiments        — Diffusers, LoRA, Gradio',
    '',
    'Navigate to /projects for full details.',
  ],
  skills: [
    'Technical Skills:',
    '  Languages  : Python, TypeScript, JavaScript, SQL',
    '  AI/ML      : TensorFlow, PyTorch, Scikit-learn, HuggingFace',
    '  CV         : OpenCV, MediaPipe, YOLOv8',
    '  Web        : Next.js, React, FastAPI, Flask',
    '  Tools      : Git, Docker, Linux, Jupyter',
  ],
  contact: [
    'Contact Information:',
    '  Email    : ayush25252@flash.co',
    '  Phone    : +91 7986771293',
    '  Location : Bengaluru, Karnataka, India',
    '',
    'Or visit /contact for the full form.',
  ],
  github: ['Opening GitHub profile...', 'github.com/Itachii0707'],
  resume: ['Navigating to resume page...', 'Visit /resume to view & download.'],
  clear: [],
};

export function DeveloperTerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<{ input?: string; output: string[] }[]>([
    { output: ['Welcome to Ayush\'s terminal. Type \'help\' to get started.'] },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([{ output: ['Terminal cleared.'] }]);
      setInput('');
      return;
    }

    if (trimmed === 'github') {
      window.open('https://github.com/Itachii0707', '_blank');
    }

    const output = COMMANDS[trimmed] || [
      `Command not found: ${trimmed}. Type 'help' for available commands.`,
    ];
    setHistory((prev) => [...prev, { input: cmd, output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 w-full max-w-lg z-[99996]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="glass-strong rounded-xl border border-cyan-DEFAULT/20 overflow-hidden shadow-glow-cyan">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-silver-mid">ayush@portfolio ~ terminal</span>
              <button onClick={onClose} className="text-silver-dim hover:text-silver-bright transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Output */}
            <div className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-2" onClick={() => inputRef.current?.focus()}>
              {history.map((entry, i) => (
                <div key={i}>
                  {entry.input !== undefined && (
                    <div className="text-cyan-DEFAULT">
                      <span className="text-violet-bright">ayush</span>
                      <span className="text-silver-mid">@portfolio</span>
                      <span className="text-silver-dim">:~$ </span>
                      {entry.input}
                    </div>
                  )}
                  {entry.output.map((line, j) => (
                    <div key={j} className="text-silver-mid pl-0">
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/5 bg-black/10">
              <span className="font-mono text-xs text-violet-bright">ayush</span>
              <span className="font-mono text-xs text-silver-mid">@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCommand(input);
                }}
                className="flex-1 bg-transparent font-mono text-xs text-cyan-DEFAULT outline-none caret-cyan-DEFAULT"
                placeholder="type a command..."
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
