Here’s the updated Markdown summary reflecting a **no-database setup with email output**:

---

# Tech Stack Decision & Rationale

## **1. Frontend**

* **Technology:** Next.js + Tailwind + shadcn/ui
* **Hosting:** Vercel
* **Purpose:**

  * Provides a fast, SEO-friendly public website.
  * Hosts the chat UI for prospective clients.
  * Uses serverless functions for lightweight, fast tasks (e.g., issuing temporary tokens).
* **Rationale:**

  * Minimal maintenance and global CDN distribution.
  * Easy integration with serverless backend for secure API calls.

---

## **2. Backend (Agentic AI)**

* **Technology:** Python + FastAPI
* **Libraries:** smolagents (or similar agentic AI frameworks)
* **Hosting:** Render / Fly.io / Cloud Run / VPS
* **Purpose:**

  * Runs long-running AI tasks (e.g., multi-step reasoning, project scoping).
  * Generates responses or summaries based on user input.
* **Rationale:**

  * Avoids Vercel serverless function timeouts.
  * Full Python environment for AI libraries and dependencies.
  * Can scale independently of frontend.

---

## **3. Security / Auth**

* **Pattern:** Temporary access token (JWT) issued by Vercel serverless function
* **Flow:**

  1. Frontend requests short-lived token from Vercel.
  2. Frontend calls FastAPI directly with token.
  3. FastAPI validates token before processing.
* **Rationale:**

  * Protects backend API while keeping frontend public.
  * Avoids exposing permanent secrets in the browser.
  * Works with long-running AI tasks without serverless limits.

---

## **4. Data / Output**

* **Database:** None (MVP / initial version)
* **Output Method:** Email

  * FastAPI backend sends processed summaries / recommendations via email using a transactional email service (SendGrid, Postmark, Resend, or SMTP).
* **Rationale:**

  * Simplifies architecture by avoiding persistent storage.
  * Provides a straightforward way to receive leads or project details.
  * Suitable for MVP testing and low-to-medium volume.

---

## **5. Key Considerations**

* Vercel serverless functions: lightweight, fast, but **timeout-prone** for long AI tasks.
* Edge functions: excellent for very fast, low-latency middleware, but unsuitable for heavy agentic AI.
* FastAPI backend: handles complex logic, long-running AI requests, and produces email outputs.
* Temporary JWT tokens: secure, short-lived access to backend from a public frontend.
* No database: keeps the MVP simple; email acts as the “storage” of project information.

---

✅ **Overall Rationale:**
This stack balances **speed, security, simplicity, and flexibility**:

* Fast, branded user-facing chat interface.
* Secure, long-running AI backend.
* Simple output via email without requiring persistent storage.
* Supports future experimentation with agentic AI without major architecture changes.
