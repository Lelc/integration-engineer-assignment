## Spark Hire integration engineering assignment

Build a small **Acme ATS** integration against the [Spark Hire Meet API v2](https://meet-api.sparkhire.com/). You will receive a **sandbox account** with API credentials.

**Time budget: 4–5 hours.** Not everything needs to be perfect — we want to see a working integration, sensible structure, and clear setup docs.

**UI mockups:** [Eng Test Mock 2024 (Figma)](https://www.figma.com/design/WyM4lR9Ww9XjN1z13p9fO8/Eng-Test-Mock-2024?node-id=3-24075&m=dev)

---

## Scenario

Recruiters use Acme ATS to:

1. Send a **one-way** Spark Hire video interview to a candidate
2. Store assessment items **locally**, kept in sync via webhooks
3. View a paginated list of assessments in a React UI
4. **Delete** assessments from the list (with confirmation)

The React app talks only to your Laravel API — not Spark Hire directly. The list reads from your database, not a live Spark Hire call.

---

## What we provide

Sandbox credentials (keep private — do not commit to GitHub):

| Variable | Description |
|----------|-------------|
| `SPARKHIRE_CLIENT_ID` / `SPARKHIRE_CLIENT_SECRET` | OAuth2 client credentials |
| `SPARKHIRE_REQUESTER_EMAIL` | Active user email for the `requester` header |
| `SPARKHIRE_WEBHOOK_SECRET` | HMAC secret for webhook signature verification |
| Sandbox login | To complete/evaluate assessments during testing |

**API base:** `https://api.sparkhire.com/v2.0` · **Docs:** [meet-api.sparkhire.com](https://meet-api.sparkhire.com/)

---

## Webhooks locally

Spark Hire must POST to a public HTTPS URL. Use a free tunnel ([ngrok](https://ngrok.com/), [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), or [localtunnel](https://localtunnel.github.io/www/)).

---

## Running the code

*Update this section with your setup instructions.*

Include how to run the API + frontend, configure `.env`, run migrations, set up a tunnel, and register webhooks.

**Optional but helpful:** a short demo video walking through setup, the main UI flows, and anything non-obvious (logs, webhook events, etc.). Add the link here or in your submission email.

---

## UI (Figma)

Match the [Figma mockups](https://www.figma.com/design/WyM4lR9Ww9XjN1z13p9fO8/Eng-Test-Mock-2024?node-id=3-24075&m=dev) closely enough that flows are recognizable. Pixel-perfect styling is not required.

Key screens: assessment list (with empty state and pagination), create one-way interview form, delete confirmation. The **View** detail modal in Figma is optional.

**Create form requirements:**

- Job and question set dropdowns populated from Spark Hire at runtime (not hard-coded in `.env`)
- Relative deadline selector (e.g. “3 days”, “7 days”) — backend converts to `due_at`

---

## Must-have

- [ ] Fork this repo; single GitHub repo with Laravel 13+ (PHP 8.3+) and React 18+ (Vite)
- [ ] Assessment list from your local API (Figma columns: candidate, type, job title, status, submitted at, deadline)
- [ ] Empty state, pagination
- [ ] Create one-way interview form; jobs and question sets from Spark Hire API
- [ ] Delete with confirmation; removes from local store
- [ ] Persist assessments locally; keep in sync via webhooks (`AssessmentItem.Created`, `.Updated`, `.Completed`, `.Evaluated`)
- [ ] Webhook signature verification per [docs](https://meet-api.sparkhire.com/webhooks#authorization)
- [ ] `.env.example` + updated README; no secrets in git

No multi-user auth required.

---

## Nice-to-have

- View detail modal (Figma)
- Webhook queueing, idempotency, event ordering
- Tests (PHPUnit, Jest) or a Bruno/Postman collection
- Docker Compose

---

## What we evaluate

- Does the Spark Hire integration work? (auth, create flow, webhooks, local sync)
- Does the UI match the Figma flows?
- How did you structure the code?
- Can we run it from your README?

If you run out of time, add a short **Notes** section on what you'd do next.
