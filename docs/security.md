## **1. Rate Limiting / Throttling**

* **Purpose:** Prevent abuse or accidental overload.
* **Implementation Options:**

  * At **FastAPI level** using middleware (e.g., `slowapi` or `fastapi-limiter`).
  * At **Vercel / frontend proxy** level: only allow X requests per IP or per token per minute.
* **Why:** Prevents resource exhaustion and limits accidental spamming by users or bots.

---

## **2. DDoS / Bot Protection**

* **Purpose:** Protect backend from traffic floods.
* **Implementation Options:**

  * Use a **Web Application Firewall (WAF)**: Cloudflare, AWS WAF, or similar.
  * Leverage **Vercel’s built-in DDOS mitigation** for serverless routes.
  * CAPTCHA on frontend if automated traffic is suspected.
* **Why:** Long-running AI tasks are expensive; a flood could easily overwhelm your service.

---

## **3. Authentication & Token Security**

* **Temporary Tokens:**

  * Short-lived (1–2 minutes).
  * Only issued via your Vercel function.
* **Secrets:**

  * Never exposed in frontend JS.
  * Store in environment variables (Vercel + Python backend).

---

## **4. CORS / Domain Restriction**

* **Purpose:** Ensure only your website can make browser-based requests.
* **Implementation:**

  * FastAPI CORS middleware with `allow_origins=["https://yourdomain.com"]`.
* **Why:** Protects against browser-based CSRF from other domains, though does not prevent non-browser requests.

---

## **5. Input Validation & Sanitization**

* **Purpose:** Prevent malicious input from crashing backend or executing code.
* **Implementation:**

  * Use Pydantic models to validate request payloads.
  * Sanitize strings or any HTML before logging or emailing.
* **Why:** Prevents injection attacks and ensures your email output is safe.

---

## **6. Logging & Monitoring**

* **Purpose:** Detect abuse patterns or errors quickly.
* **Implementation:**

  * Log request metadata (IP, token used, timestamp).
  * Set up alerts on abnormal traffic, error spikes, or repeated invalid tokens.
* **Why:** Early detection of attacks or misbehaving users.

---

## **7. Transport Security**

* **HTTPS Everywhere:**

  * Ensure frontend → Vercel → FastAPI → email calls are all over HTTPS.
  * Avoid sending API tokens over plain HTTP.

---

## **8. Email Security**

* **Purpose:** Protect sensitive data in transit.
* **Implementation:**

  * Use transactional email providers with TLS.
  * Avoid sending sensitive credentials; only project summaries / descriptions.
* **Why:** Email is inherently insecure, so minimize sensitive info.

---

## **9. Optional Advanced Protections**

* **IP Whitelisting:** Only allow known IP ranges (if applicable).
* **Request Size Limits:** Reject requests above a certain payload size to avoid memory exhaustion.
* **Concurrency Limits:** Limit simultaneous agent calls per user/token.
* **Audit Logging:** Store summaries of processed requests (even temporarily) for compliance or debugging.

---

💡 **Rule of Thumb for MVP:**

1. **Temporary token + HTTPS** → mandatory.
2. **Rate limiting / size limits** → low-effort protection.
3. **DDoS / WAF / monitoring** → optional but highly recommended once public traffic grows.

