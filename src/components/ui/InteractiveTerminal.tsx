'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronRight, Play } from 'lucide-react';

interface LogLine {
  type: 'command' | 'output' | 'system';
  text: string;
}

const COMMAND_RESPONSES: Record<string, string[]> = {
  whoami: [
    'Name: Ayush Ranjan',
    'Role: AI Engineer & Software Developer',
    'Location: Bengaluru, India',
    'Focus: Computer Vision, Deep Learning, Generative AI',
  ],
  skills: [
    'Languages: Python, C++, TypeScript, JavaScript, SQL',
    'AI & Vision: OpenCV, MediaPipe, TensorFlow, PyTorch, YOLOv8',
    'Frameworks: Next.js, React, FastAPI, Flask, Node.js',
    'Database & Devops: PostgreSQL, SQLite, Supabase, Git, Docker, Vercel',
  ],
  contact: [
    'Email: ayush25252@flash.co',
    'Phone: +91 7986771293',
    'GitHub: https://github.com/Itachii0707',
    'LinkedIn: https://www.linkedin.com/in/ayush-ranjan-62628a3b2/',
  ],
  help: [
    'Available commands:',
    '  whoami   - Display bio summary',
    '  skills   - List technical expertise',
    '  contact  - Show contact channels',
    '  clear    - Flush terminal console buffer',
  ],
};

export function InteractiveTerminal() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [currentTypingCmd, setCurrentTypingCmd] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Initial boot sequence simulation
  useEffect(() => {
    const bootLines: LogLine[] = [
      { type: 'system', text: 'Initializing AyushRanjan-OS Kernel v4.2.0...' },
      { type: 'system', text: 'Connecting to database clusters... Connected.' },
      { type: 'system', text: 'Establishing secure shell handshake... Success.' },
      { type: 'system', text: 'Welcome to guest shell. Type "help" or click buttons to explore.' },
    ];

    let timer = 100;
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
      }, timer * (i + 1));
    });

    // Auto-type 'whoami' after boot
    setTimeout(() => {
      simulateTyping('whoami');
    }, 1200);
  }, []);

  const simulateTyping = (cmd: string) => {
    setCurrentTypingCmd('');
    setTypingIndex(0);
    
    let currentText = '';
    let charIndex = 0;
    
    const interval = setInterval(() => {
      if (charIndex < cmd.length) {
        currentText += cmd[charIndex];
        setCurrentTypingCmd(currentText);
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          executeCommand(cmd);
          setCurrentTypingCmd('');
        }, 150);
      }
    }, 60);
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...logs, { type: 'command' as const, text: `guest@ayushranjan:~$ ${cmdStr}` }];

    if (trimmed === 'clear') {
      setLogs([]);
      return;
    }

    if (trimmed in COMMAND_RESPONSES) {
      COMMAND_RESPONSES[trimmed].forEach((line) => {
        newLogs.push({ type: 'output', text: line });
      });
    } else {
      newLogs.push({
        type: 'output',
        text: `Command not found: "${cmdStr}". Type "help" for a list of available actions.`,
      });
    }

    setLogs(newLogs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-strong rounded-xl border border-white/10 overflow-hidden font-mono text-sm shadow-2xl shadow-obsidian-900/50">
      {/* Terminal Title Bar */}
      <div className="bg-obsidian-800/80 px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-2 text-silver-dim text-xs font-semibold">
          <Terminal size={14} className="text-cyan-DEFAULT" />
          <span>guest@ayushranjan.dev: ~</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Terminal Body */}
      <div className="bg-obsidian-900/95 p-6 h-80 overflow-y-auto space-y-3 scrollbar-thin">
        {logs.map((log, i) => (
          <div
            key={i}
            className={
              log.type === 'command'
                ? 'text-cyan-DEFAULT font-bold'
                : log.type === 'system'
                ? 'text-violet-light/70 italic'
                : 'text-silver-bright'
            }
          >
            {log.text}
          </div>
        ))}

        {/* Current simulated typing command */}
        {currentTypingCmd && (
          <div className="text-cyan-DEFAULT font-bold">
            guest@ayushranjan:~$ {currentTypingCmd}
            <span className="w-2 h-4 bg-cyan-DEFAULT inline-block animate-pulse ml-1 align-middle" />
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar & Hot Buttons */}
      <div className="bg-obsidian-800/50 border-t border-white/5 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Clickable Quick Commands */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-silver-dim text-xs uppercase tracking-wider font-semibold mr-1">Quick Run:</span>
          {['whoami', 'skills', 'contact', 'help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => simulateTyping(cmd)}
              disabled={!!currentTypingCmd}
              className="px-3 py-1 rounded bg-obsidian-700/50 border border-white/5 text-xs text-silver-mid hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-mono"
            >
              <Play size={10} className="fill-current text-cyan-DEFAULT/40" />
              {cmd}
            </button>
          ))}
        </div>

        {/* Manual Terminal input prompt */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md">
          <div className="relative flex items-center text-cyan-DEFAULT">
            <ChevronRight size={18} className="absolute left-2 text-cyan-DEFAULT" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={!!currentTypingCmd}
              placeholder="Or type a custom command here..."
              className="w-full bg-obsidian-900 border border-white/10 rounded px-3 py-1.5 pl-8 text-silver-bright font-mono text-sm focus:outline-none focus:border-cyan-DEFAULT/40 placeholder:text-silver-dim/60 transition-colors"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
