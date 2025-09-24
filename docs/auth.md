# Auth Flow for Frontend → FastAPI Agent

## Overview

This flow allows a public frontend to securely call a long-running Python backend (e.g., agentic AI) without exposing permanent secrets, while avoiding Vercel serverless function timeouts.

---

## **1. Frontend Requests Temporary Token**

* **Endpoint:** `/api/get-token` (Vercel serverless function)
* **Method:** `POST`
* **Purpose:** Issues a short-lived access token for the frontend to use when calling the Python backend.
* **Process:**

  1. Frontend sends a request to `/api/get-token`.
  2. Vercel function optionally validates user/session.
  3. Vercel function generates a **JWT token** with:

     * Expiration time (e.g., 60–120 seconds)
     * Minimal payload identifying the session/user
  4. Token is returned in the response JSON:

```json
{
  "token": "<temporary_jwt_token>"
}
```

---

## **2. Frontend Calls Python Backend Directly**

* **Endpoint:** `/agent` (FastAPI service)
* **Method:** `POST`
* **Headers:**

  * `Authorization: Bearer <temporary_jwt_token>`
* **Payload:** Chat message or request data

**Process:**

1. Frontend includes the temporary token in the `Authorization` header.
2. FastAPI verifies the token:

   * Checks signature with the permanent secret.
   * Checks expiration time.
3. If valid, FastAPI processes the agentic AI request.
4. FastAPI returns response JSON to frontend.

```json
{
  "reply": "agent response"
}
```

---

## **3. Security Notes**

* Tokens are **short-lived** to minimize risk if intercepted.
* Permanent secrets (used to sign tokens) are **never exposed to the frontend**.
* FastAPI only accepts requests with **valid, unexpired tokens**.
* Optional: enforce **CORS** to allow requests only from your frontend domain.

---

## **4. Advantages of This Flow**

* Avoids **Vercel serverless timeout limits**, since the Python backend handles long-running requests directly.
* Provides **secure access** without exposing secrets to users.
* Scales well for multiple concurrent users.
* Enables full control over agentic AI tasks and session persistence.

---

If you want, I can also **add a diagram in Markdown with ASCII arrows** to visualize the flow from browser → Vercel → Python backend → browser. It’s often helpful for quick documentation.
