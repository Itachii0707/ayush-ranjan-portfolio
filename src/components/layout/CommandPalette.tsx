'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink } from 'lucide-react';
import { commandPaletteItems } from '@/config/navigation';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = commandPaletteItems.filter(
    (item) =>
      query === '' ||
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.group.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {} as Record<string, typeof commandPaletteItems>
  );

  const handleSelect = (item: (typeof commandPaletteItems)[0]) => {
    setIsOpen(false);
    setQuery('');
    if (item.external) {
      window.open(item.href, '_blank');
    } else {
      router.push(item.href);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99997] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-obsidian-900/80 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            className="relative w-full max-w-xl mx-4 glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            initial={{ scale: 0.96, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
              <Search size={18} className="text-silver-mid flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search pages, actions, links..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-silver-bright placeholder-silver-dim text-sm outline-none font-inter"
              />
              <kbd className="hidden sm:flex items-center gap-1 text-xs text-silver-dim bg-white/5 px-2 py-1 rounded">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 py-2 text-xs font-medium text-silver-dim uppercase tracking-wider">
                    {group}
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-silver-bright group-hover:text-cyan-DEFAULT transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {(item as { external?: boolean }).external ? (
                          <ExternalLink size={14} className="text-silver-dim" />
                        ) : (
                          <ArrowRight size={14} className="text-silver-dim" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-silver-dim text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-3 border-t border-white/5 text-xs text-silver-dim">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
              <span className="ml-auto">⌘K to open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
