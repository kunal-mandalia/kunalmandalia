'use client'
import React, { useEffect, useRef, useState } from 'react';

interface Line {
  type: 'user' | 'system' | 'project' | 'header';
  text: string;
  link?: string;
}

export default function HackerTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'header', text: '👋 Welcome to kunalmandalia.com // Full Stack Engineer' },
    { type: 'header', text: 'Type "help" to see available commands' },
    { type: 'system', text: ' ' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [path, setPath] = useState('/home/kunalmandalia');
  const [hasFocus, setHasFocus] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const cvContent = [
    '==============================',
    '         cv.md',
    '==============================',
    'Name: Kunal Mandalia',
    'Role: Senior Full Stack Engineer / AI Engineer',
    '',
    'Current Position:',
    '  Desia (Apr 2024 - Present)',
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
    '      contact.md',
    '==============================',
    'LinkedIn:',
    '  https://www.linkedin.com/in/kunal-mandalia-developer/',
    '',
    'GitHub:',
    '  https://github.com/kunal-mandalia',
    '',
    'Open to:',
    '  - Interesting projects',
    '  - Professional connections',
    '==============================',
  ];

  const clientsContent = [
    '==============================',
    '      clients.md',
    '==============================',
    '  (Contract engagements only)',
    '',
    'Desia',
    '  Apr 2024 - Present',
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
    '90POE',
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

  useEffect(() => {
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Update cursor position based on input and cursor position
  useEffect(() => {
    if (inputRef.current && cursorRef.current) {
      const inputElement = inputRef.current;
      const cursor = cursorRef.current;

      // Get the text up to the cursor position
      const textBeforeCursor = inputElement.value.substring(0, cursorPosition);

      // Create a temporary span to measure text width
      const measureSpan = document.createElement('span');
      measureSpan.style.font = window.getComputedStyle(inputElement).font;
      measureSpan.style.visibility = 'hidden';
      measureSpan.style.position = 'absolute';
      measureSpan.style.whiteSpace = 'pre';
      measureSpan.textContent = textBeforeCursor || '';
      document.body.appendChild(measureSpan);

      const textWidth = measureSpan.offsetWidth;
      document.body.removeChild(measureSpan);

      cursor.style.left = `${textWidth}px`;
    }
  }, [input, cursorPosition]);

  // Track cursor position changes
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const updateCursorPos = () => {
      setCursorPosition(inputElement.selectionStart || 0);
    };

    inputElement.addEventListener('click', updateCursorPos);
    inputElement.addEventListener('keyup', updateCursorPos);
    inputElement.addEventListener('select', updateCursorPos);

    return () => {
      inputElement.removeEventListener('click', updateCursorPos);
      inputElement.removeEventListener('keyup', updateCursorPos);
      inputElement.removeEventListener('select', updateCursorPos);
    };
  }, []);

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
        pushLine({ type: 'header', text: 'System commands:' });
        pushLine({ type: 'system', text: '  ls        List directory contents' });
        pushLine({ type: 'system', text: '  cat       Display file contents' });
        pushLine({ type: 'system', text: '  pwd       Show current directory' });
        pushLine({ type: 'system', text: '  cd        Change directory' });
        pushLine({ type: 'system', text: '  clear     Clear the screen' });
        pushLine({ type: 'system', text: '  help      Show this help text' });
        pushLine({ type: 'system', text: '' });
        pushLine({ type: 'header', text: 'Portfolio commands:' });
        pushLine({ type: 'system', text: '  cv        View my CV' });
        pushLine({ type: 'system', text: '  clients   See client engagements' });
        pushLine({ type: 'system', text: '  contact   Get in touch' });
        break;
      case 'ls':
        if (path === '/home/kunalmandalia') {
          pushLine({ type: 'system', text: 'cv.md  clients.md  contact.md' });
        } else if (path === '/home') {
          pushLine({ type: 'system', text: 'kunalmandalia/' });
        } else if (path === '/') {
          pushLine({ type: 'system', text: 'home/' });
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
        pushLine({ type: 'system', text: 'cv.md — Senior Full Stack Engineer / AI Engineer\n- Current: Desia (AI productivity tools for private equity)\n- Experience: Full-stack apps, Next.js, React, Node.js, Python, AI/ML\n- Contact: linkedin.com/in/kunal-mandalia-developer\n- Use: cat cv.md for full CV' });
        break;
      case 'clients':
        pushLine({ type: 'system', text: 'clients.md — Client History (Contract engagements)\n- 6 major clients: Desia, SuperID, Advent International, Shell, Eurostar, 90POE\n- Experience across PE, fintech, transport, maritime industries\n- Use: cat clients.md for full list' });
        break;
      case 'cat':
        if (path !== '/home/kunalmandalia') {
          pushLine({ type: 'system', text: `cat: ${parts[1] || ''}: No such file or directory` });
        } else if (parts[1] === 'cv.md') {
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
          pushLine({ type: 'system', text: `cat: ${parts[1] || ''}: No such file or directory` });
        }
        break;
      case 'contact':
        pushLine({ type: 'header', text: 'LinkedIn:' });
        pushLine({ type: 'system', text: 'https://www.linkedin.com/in/kunal-mandalia-developer/', link: 'https://www.linkedin.com/in/kunal-mandalia-developer/' });
        pushLine({ type: 'system', text: '' });
        pushLine({ type: 'header', text: 'GitHub:' });
        pushLine({ type: 'system', text: 'https://github.com/kunal-mandalia', link: 'https://github.com/kunal-mandalia' });
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        pushLine({ type: 'system', text: `command not found: ${c}` });
        pushLine({ type: 'header', text: 'Type "help" for available commands' });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    runCommand(input);

    setHistory(h => [input, ...h].slice(0, 50));
    setHistIndex(-1);
    setInput('');
    setCursorPosition(0);
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
    }
  }

  return (
    <div
      className="min-h-screen bg-black text-gray-100 font-mono p-6 flex items-center justify-center"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-4xl border-2 border-gray-600 shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-black/80 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <div className={`w-3 h-3 rounded-full transition-colors ${hasFocus ? 'bg-red-600/90' : 'bg-gray-600'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors ${hasFocus ? 'bg-yellow-600/90' : 'bg-gray-600'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors ${hasFocus ? 'bg-green-600/90' : 'bg-gray-600'}`} />
          <div className="ml-3 text-sm text-gray-100">kunalmandalia.com</div>
          <div className="ml-auto text-xs text-gray-500 hidden md:block">node@localhost:~</div>
        </div>

        <div ref={containerRef} className="bg-black px-6 py-4 h-[60vh] overflow-y-auto">
          {lines.map((ln, idx) => (
            <div key={idx} className={`whitespace-pre-wrap break-words leading-loose text-xs md:text-sm ${ln.type === 'user' ? 'text-white' : ''}`}>
              {ln.type === 'header' ? (
                <span className="text-gray-400">{ln.text}</span>
              ) : ln.type === 'project' ? (
                <span className="text-white">{ln.text}</span>
              ) : ln.link ? (
                <a href={ln.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 underline">
                  {ln.text}
                </a>
              ) : (
                <span>{ln.text}</span>
              )}
            </div>
          ))}

          <div className="whitespace-pre-wrap break-words leading-loose text-xs md:text-sm">
            <form onSubmit={handleSubmit} className="flex" aria-label="terminal-input-form">
              <label htmlFor="terminal-input" className="text-white">$&nbsp;</label>
              <div className="relative flex-1">
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none placeholder:text-gray-500 text-white"
                  style={{ caretColor: 'transparent' }}
                  placeholder=""
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
                <span
                  ref={cursorRef}
                  className="absolute pointer-events-none"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '0.6em',
                    height: '1em',
                    backgroundColor: (hasFocus && cursorVisible) ? 'white' : 'transparent',
                    display: 'inline-block',
                    transition: 'left 0.05s',
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:flex bg-black/90 px-4 py-2 border-t border-gray-700 items-center justify-between text-xs text-gray-400">
          <div>tip: press ↑ to browse history</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
