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

  const cvContent = [
    '==============================',
    '         CV.MD',
    '==============================',
    'Name: Kunal Mandalia',
    'Role: Senior Full Stack Engineer / AI Engineer',
    '',
    'Current Position:',
    '  Desia (Apr 2024 - Present, 10 months)',
    '  - AI productivity tools for private equity',
    '  - 10x response time improvement with WebSockets/SSE',
    '  - Document fact checking tool (Microsoft Store)',
    '  - Multi-agent system integration with ML team',
    '',
    'Recent Experience:',
    '  Lead Software Engineer - SuperID (Feb 2023 - Feb 2024, 1y 1m)',
    '  - New York based SaaS platform with Snowflake, React, Node.js',
    '  - Stripe subscription payments (5-digit subscriptions)',
    '  - 50%+ query performance improvements',
    '',
    '  Software Engineer - Advent International (Apr 2020 - Jul 2022, 2y 4m)',
    '  - Private equity deal-making platform',
    '  - Led GraphQL API implementation (2x speed improvement)',
    '  - 600+ test regression suite',
    '',
    '  TypeScript Developer - Shell (Aug 2019 - Apr 2020, 9 months)',
    '  - Aviation contract management digitisation',
    '  - 100x throughput increase for contract submissions',
    '',
    'Education:',
    '  BSc - University of Manchester (2006-2008)',
    '  React Nanodegree - Udacity (2017)',
    '  Leadership & Professional Development PgC - Harper Adams (2013-2014)',
    '',
    'Tech Stack:',
    '  TypeScript, React, Next.js, Node.js, Python, FastAPI',
    '  PostgreSQL, Snowflake, GraphQL, WebSockets',
    '  AWS, Heroku, Docker, Kubernetes',
    '',
    'Contact: linkedin.com/in/kunal-mandalia-developer',
    '==============================',
  ];

  const contactContent = [
    '==============================',
    '      CONTACT.MD',
    '==============================',
    'LinkedIn:',
    '  https://www.linkedin.com/in/kunal-mandalia-developer/',
    '',
    'Open to:',
    '  - Consulting opportunities',
    '  - Interesting projects',
    '  - Professional connections',
    '==============================',
  ];

  const clientsContent = [
    '==============================',
    '      CLIENTS.MD',
    '==============================',
    '  (Contract engagements only)',
    '',
    'Desia',
    '  Apr 2024 - Present (10 months)',
    '  Senior Full Stack Engineer / AI Engineer',
    '  AI productivity tools for private equity professionals',
    '',
    'SuperID',
    '  Feb 2023 - Feb 2024 (1 year, 1 month)',
    '  Lead Software Engineer',
    '  New York based SaaS platform with data analytics',
    '',
    'Advent International',
    '  Apr 2020 - Jul 2022 (2 years, 4 months)',
    '  Software Engineer',
    '  Deal-making platform for top 10 global PE firm',
    '',
    'Shell',
    '  Aug 2019 - Apr 2020 (9 months)',
    '  TypeScript Developer',
    '  Aviation contract management digitisation',
    '',
    'Eurostar',
    '  Feb 2019 - Aug 2019 (8 months, 2 roles)',
    '  Technical Lead / JavaScript Developer',
    '  Booking management for 10M+ passengers annually',
    '',
    'Ninety Percent of Everything',
    '  Feb 2018 - Feb 2019 (1 year, 2 roles)',
    '  Technical Lead / JavaScript Developer',
    '  Maritime industry auditing and IoT platform',
    '',
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
        pushLine({ type: 'system', text: 'Available commands: help, ls, cat, cv, clients, echo, clear, contact, pwd, cd' });
        break;
      case 'ls':
        if (path === '/home/kunalmandalia') {
          pushLine({ type: 'system', text: 'cv.md  clients.md  contact.md' });
        } else {
          pushLine({ type: 'system', text: '' });
        }
        break;
      case 'pwd':
        pushLine({ type: 'system', text: path });
        break;
      case 'cd':
        let newPath = path;
        if (!parts[1] || parts[1] === '~') {
          newPath = '/home/kunalmandalia';
        } else if (parts[1] === '..') {
          newPath = path.split('/').slice(0, -1).join('/') || '/';
        } else {
          newPath = path === '/' ? `/${parts[1]}` : `${path}/${parts[1]}`;
        }
        setPath(newPath);
        pushLine({ type: 'system', text: `directory changed to ${newPath}` });
        break;
      case 'cv':
        pushLine({ type: 'system', text: 'cv.md — Senior Full Stack Engineer / AI Engineer\n- Current: Desia (AI productivity tools for private equity)\n- Experience: Full-stack apps, Next.js, React, Node.js, Python, AI/ML\n- Contact: linkedin.com/in/kunal-mandalia-developer' });
        break;
      case 'clients':
        pushLine({ type: 'system', text: 'clients.md — Client History (Contract engagements)\n- 6 major clients: Desia, SuperID, Advent International, Shell, Eurostar, 90poe\n- Experience across PE, fintech, transport, maritime industries\n- Use: cat clients.md for full list' });
        break;
      case 'cat':
        if (parts[1] === 'cv.md') {
          cvContent.forEach((line, i) => {
            setTimeout(() => {
              pushLine({ type: 'system', text: line });
            }, i * 50);
          });
        } else if (parts[1] === 'clients.md') {
          clientsContent.forEach((line, i) => {
            setTimeout(() => {
              pushLine({ type: 'system', text: line });
            }, i * 50);
          });
        } else if (parts[1] === 'contact.md') {
          contactContent.forEach((line, i) => {
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
        pushLine({ type: 'system', text: 'LinkedIn: https://www.linkedin.com/in/kunal-mandalia-developer/' });
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
