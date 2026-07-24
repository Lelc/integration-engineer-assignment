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

### Requirements

- Docker and Docker Compose

---

### Getting started

#### Generate credentials 
Visit [Custom Integration V2 page](https://app.sparkhire.com/company/settings/user/integrations/v2/custom_integration_v2) to create your client credentials.   
They'll be used later for configuring SPARKHIRE_CLIENT_ID and SPARKHIRE_CLIENT_SECRET variables in your .env

#### Create a tunnel

> [!NOTE]
> The following instructions are for [ngrok](https://ngrok.com/) and Linux, but feel free to use your options of choice  

> [!WARNING]
> These instructions are encountered in [ngrok's documentation](https://dashboard.ngrok.com/get-started/setup/linux) so you can follow them there.  
>
> However, keep in mind that it is needed to use port 8000 in step 3

First create your ngrok account: [Signup](https://dashboard.ngrok.com/signup)

1. Install ngrok via Apt with the following command:
    ```bash
    curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
      | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
      && echo "deb https://ngrok-agent.s3.amazonaws.com bookworm main" \
      | sudo tee /etc/apt/sources.list.d/ngrok.list \
      && sudo apt update \
      && sudo apt install ngrok
    ```
2. Add your authtoken
    
    You can see $YOUR_AUTHTOKEN at [setup page](https://dashboard.ngrok.com/get-started/setup/linux) or at [your-authtoken page](https://dashboard.ngrok.com/get-started/your-authtoken) 
    ```bash
    ngrok config add-authtoken $YOUR_AUTHTOKEN
    ```
3. Get a public URL for your app
    
    You can see $YOUR_DEVDOMAIN at [setup page](https://dashboard.ngrok.com/get-started/setup/linux) in step 3 or at [domains page](https://dashboard.ngrok.com/domains)
    ```bash
    ngrok http --url=$YOUR_DEVDOMAIN 8000
    ```
   
#### Configure webhook

> [!TIP]
> You can configure your integration's webhook later if you prefer 
>- Configuring it before the **Installation** section avoids you having to revisit your .env file later
>- Configuring it after the **Installation** section avoids you having to go back to [configure webhooks page](https://app.sparkhire.com/company/settings/user/integrations/v2/custom_integration_v2/configure/webhooks) to test and enable the webhook


1. Access [configure webhooks page](https://app.sparkhire.com/company/settings/user/integrations/v2/custom_integration_v2/configure/webhooks)
2. Click in `Add Webhook`
3. Fill the inputs
    
    you'll need your $YOUR_DEVDOMAIN from **Create a tunnel** section

   | Input        | Value                                                                                                            |
   |--------------|------------------------------------------------------------------------------------------------------------------|
   | URL          | $YOUR_DEVDOMAIN/api/webhooks/sparkhire                                                                           |
   | Description: | Description string                                                                                               |
   | Auth secret: | Auth secret string <br> (will be also used later for configuring SPARKHIRE_WEBHOOK_SECRET variable in your .env) |
    
4. Click in `Create Webhook`
5. After you finish **Installation** section you need to go back to [configure webhooks page](https://app.sparkhire.com/company/settings/user/integrations/v2/custom_integration_v2/configure/webhooks) so you can test and enable your webhook 

---

## Installation

#### Clone the project

```bash
git clone https://github.com/Lelc/integration-engineer-assignment.git
cd integration-engineer-assignment
```

#### Configure environment variables

> [!TIP]
> See the **Getting started** section for instructions on obtaining the required Spark Hire credentials.

```bash
cp .env.example .env
```
then using vim, nano or your IDE of choice you need to update `.env`

| Variable                  | Value                                    |
|---------------------------|------------------------------------------|
| SPARKHIRE_CLIENT_ID       | Generated in **Getting Started** section |
| SPARKHIRE_CLIENT_SECRET   | Generated in **Getting Started** section |
| SPARKHIRE_REQUESTER_EMAIL | The same used in your sandbox login      |
| SPARKHIRE_WEBHOOK_SECRET  | Generated in **Getting Started** section |

#### Start the application

```bash
docker compose up -d
```

#### Access the application

The frontend and API are served from the same application URL:

 http://localhost:8000 

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

## Architecture

- Laravel 13 backend exposing a local REST API
- React frontend consuming only the local API
- Spark Hire accessed exclusively by the backend
- Webhooks processed asynchronously through queues
- Assessment data persisted locally and synchronized via webhooks

## Notes
Future improvements if it were a long-term project:

- Install [phpinsights](https://github.com/nunomaduro/phpinsights) or similar to enforce code quality.
- Install [scramble](https://github.com/dedoc/scramble) or similar to generate API documentation for local endpoints. 
- Increase test coverage.
- setup CI pipeline.
- Implement retry/backoff and dead-letter handling for failed queued jobs.
- Add metrics and health checks for queue workers and webhook processing.
- Add authentication and authorization for the local API if it were exposed publicly.
- Make the frontend more closely match the provided Figma design.
