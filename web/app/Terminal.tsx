'use client'
import React, { useEffect, useRef, useState } from 'react';

interface Line {
  type: 'user' | 'system' | 'project';
  text: string;
}

export default function HackerTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [path, setPath] = useState('/home/kunalmandalia');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const projects = [
    { name: 'Scheduler', desc: 'Personal time & calendar planner', url: '#' },
    { name: 'Drive Tutor', desc: 'Interactive driving lessons app', url: '#' },
    { name: 'Rental Reporter', desc: 'Rental income analytics dashboard', url: '#' }
  ];

  const resumeContent = [
    '==============================',
    '       RESUME.TXT',
    '==============================',
    'Name: Kunal',
    'Role: Senior Software Engineer (JS/TS)',
    'Experience:',
    '  - Full-stack web applications (Next.js, Tailwind, Python)',
    '  - API design, automation, and data-driven tools',
    '  - Cloud deployment (Vercel, AWS)',
    'Contact: you@domain.com',
    '==============================',
  ];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function pushLine(newLine: Line) {
    setLines(prev => [...prev, newLine]);
  }

  function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    pushLine({ type: 'user', text: `$ ${cmd}` });

    const parts = cmd.split(' ');
    const c = parts[0].toLowerCase();

    switch (c) {
      case 'help':
        pushLine({ type: 'system', text: 'Available commands: help, ls, cat, projects, resume, echo, clear, contact, pwd, cd' });
        break;
      case 'ls':
        pushLine({ type: 'system', text: 'projects  resume.txt  contact.txt' });
        break;
      case 'pwd':
        pushLine({ type: 'system', text: path });
        break;
      case 'cd':
        if (!parts[1] || parts[1] === '~') {
          setPath('/home/kunalmandalia');
        } else if (parts[1] === '..') {
          const newPath = path.split('/').slice(0, -1).join('/') || '/';
          setPath(newPath);
        } else {
          const newPath = path === '/' ? `/${parts[1]}` : `${path}/${parts[1]}`;
          setPath(newPath);
        }
        pushLine({ type: 'system', text: `directory changed to ${path}` });
        break;
      case 'projects':
        projects.forEach(p => pushLine({ type: 'project', text: `${p.name} — ${p.desc}  [open:${p.url}]` }));
        break;
      case 'resume':
        pushLine({ type: 'system', text: 'resume.txt — Senior Software Engineer (JS/TS)\n- Experience: Full-stack apps, Next.js, Tailwind, Python\n- Contact: contact()' });
        break;
      case 'cat':
        if (parts[1] === 'resume.txt') {
          resumeContent.forEach((line, i) => {
            setTimeout(() => {
              pushLine({ type: 'system', text: line });
            }, i * 50);
          });
        } else {
          pushLine({ type: 'system', text: `cat: ${parts[1] || ''}: No such file` });
        }
        break;
      case 'echo':
        pushLine({ type: 'system', text: parts.slice(1).join(' ') });
        break;
      case 'contact':
        pushLine({ type: 'system', text: 'Email: you@domain.com — replace this placeholder in the component.' });
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        pushLine({ type: 'system', text: `command not found: ${c}` });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);

    setHistory(h => [input, ...h].slice(0, 50));
    setHistIndex(-1);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = Math.min(history.length - 1, histIndex + 1);
      setHistIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.max(-1, histIndex - 1);
      setHistIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setInput('');
      setLines([]);
    }
  }

  return (
    <div
      className="min-h-screen bg-black text-green-300 font-mono p-6 flex items-center justify-center"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-4xl border-2 border-green-700 shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-black/80 px-4 py-2 flex items-center gap-3 border-b border-green-800">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-3 text-sm text-green-400">kunalmandalia.com</div>
          <div className="ml-auto text-xs text-green-500 hidden sm:block">node@localhost:~</div>
        </div>

        <div ref={containerRef} className="bg-black px-6 py-5 h-[60vh] overflow-y-auto">
          {lines.map((ln, idx) => (
            <div key={idx} className={`whitespace-pre-wrap break-words leading-relaxed text-sm ${ln.type === 'user' ? 'text-green-100' : ''}`}>
              {ln.type === 'project' ? (
                <span className="text-green-200">{ln.text}</span>
              ) : (
                <span>{ln.text}</span>
              )}
            </div>
          ))}

          <div className="mt-2" />

          <form onSubmit={handleSubmit} className="flex items-center gap-3" aria-label="terminal-input-form">
            <div className="text-sm text-green-400">$</div>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none placeholder:text-green-600 text-green-200 text-sm"
              placeholder="type a command (help)"
              autoComplete="off"
            />
          </form>
        </div>

        <div className="bg-black/90 px-4 py-2 border-t border-green-800 flex items-center justify-between text-xs text-green-500">
          <div>tips: press ↑ to browse history • Ctrl+C to clear input</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
