# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Personal portfolio website featuring an interactive hacker-themed terminal interface, with plans for an agentic AI backend for project scoping and consultation.

## Project Structure

```
/
├── web/              # Next.js 15 frontend application
│   ├── app/          # Next.js App Router pages and components
│   │   ├── page.tsx          # Home page (renders Terminal component)
│   │   ├── Terminal.tsx      # Main terminal UI component (client-side)
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── public/       # Static assets
├── docs/             # Architecture and planning documents
│   ├── tech-stack.md   # Technology decisions and rationale
│   ├── auth.md         # JWT auth flow design (frontend → FastAPI)
│   ├── security.md     # Security considerations
│   └── summary.md      # Project summary
└── .claude/          # Claude Code workspace files
```

## Development Commands

All commands should be run from the `web/` directory:

```bash
cd web

# Development
npm run dev          # Start dev server with Turbopack at localhost:3000

# Production
npm run build        # Build for production with Turbopack
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Tech Stack

### Frontend (Current)
- **Framework:** Next.js 15.5.4 with App Router and Turbopack
- **React:** v19.1.0
- **Styling:** Tailwind CSS v4 (with @tailwindcss/postcss)
- **TypeScript:** v5

### Backend (Planned - see docs/)
- **Backend:** Python + FastAPI (for long-running agentic AI tasks)
- **Auth:** JWT tokens issued by Vercel serverless functions
- **Output:** Email-based (no database in MVP)
- **Hosting:** Vercel (frontend) + Render/Fly.io/Cloud Run (backend)

## Architecture

### Terminal Component (`web/app/Terminal.tsx`)

The main interactive component that simulates a Unix-like terminal:

- **Client-side only** (`'use client'` directive)
- **State management:** Local React state for command history, lines, current path
- **Commands:** `help`, `ls`, `cd`, `pwd`, `cat`, `projects`, `resume`, `echo`, `clear`, `contact`
- **Features:**
  - Command history navigation (↑/↓ arrow keys)
  - Keyboard shortcuts (Ctrl/Cmd+C to clear)
  - Auto-scrolling output
  - Virtual file system with paths (`/home/kunalmandalia`, `/home/kunalmandalia/projects`)

### Key Patterns

1. **Lines array:** Stores terminal output with types: `'user'`, `'system'`, `'project'`
2. **Path simulation:** Tracks current directory in state, updates with `cd` command
3. **Command execution:** `runCommand()` parses input and dispatches to switch/case handlers
4. **Async output:** Some commands (like `cat resume.txt`) use `setTimeout` for typewriter effect

### Future Integration

The architecture is designed to add:
- `/api/get-token` endpoint (Vercel serverless) to issue short-lived JWT tokens
- Direct frontend → FastAPI calls for agentic AI interactions
- Email output for project scoping results (no persistent storage in MVP)

See `docs/auth.md` for the planned authentication flow and `docs/tech-stack.md` for full rationale.

## Important Notes

- The terminal component must remain client-side (`'use client'`)
- All styling uses Tailwind utility classes
- The project uses Next.js App Router (not Pages Router)
- Turbopack is enabled for both dev and build commands
- Focus on the terminal UX - it's the primary user interface
