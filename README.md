# Hanuman — TrainTrack Marketing Website

Production-ready marketing website for selling the TrainTrack LMS product. Built with the same Docker microservices architecture as TrainTrack itself.

## Architecture

```
┌────────────┐        ┌──────────────┐       ┌──────────────┐
│   Browser   │─9080──▸│    Nginx      │──5001▸│ Lead Service │
│             │─9443──▸│  (SSL/Proxy)  │       │   (Flask)    │
└────────────┘        └───────┬──────┘       └──────┬───────┘
                              │ 3000                 │
                       ┌──────▼──────┐       ┌──────▼───────┐
                       │  Frontend    │       │  PostgreSQL  │
                       │ (React/Vite) │       │   + Redis    │
                       └─────────────┘       └──────────────┘
```

**Three-tier Docker networking** (mirrors TrainTrack):
- `frontend-net` — nginx ↔ frontend
- `backend-net` — nginx ↔ lead-service
- `data-net` (internal) — lead-service ↔ PostgreSQL + Redis

## Quick Start

```bash
# Clone and navigate
cd Hanuman

# Start all services
docker compose up --build -d

# View the site
open https://localhost:9443   # Accept self-signed cert
open http://localhost:9080     # HTTP redirect
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| **nginx** | 9080, 9443 | Reverse proxy with SSL, gzip, rate limiting |
| **frontend** | 3100 | React + Vite marketing site (SPA) |
| **lead-service** | 5001 | Flask API for form submissions & lead management |
| **db** | 5432 | PostgreSQL 16 — leads, contacts, subscribers, page_views |
| **redis** | 6379 | Rate limiter backend & cache |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/leads/audit-booking` | Submit compliance audit form |
| `GET` | `/api/leads` | List leads (paginated, filterable) |
| `GET` | `/api/leads/:id` | Get lead detail |
| `PUT` | `/api/leads/:id/status` | Update lead status |
| `POST` | `/api/contact` | General contact form |
| `POST` | `/api/subscribe` | Newsletter subscription |
| `POST` | `/api/analytics/pageview` | Track page view |
| `GET` | `/health` | Service health check |

## Testing

```bash
# Run integration tests
docker compose --profile test run --rm test-runner

# View test report
open tests/report/report.html
```

## Load Testing

```bash
# Locust web UI at http://localhost:8089
docker compose up locust -d

# Or run headless
docker compose run --rm locust \
  -f /mnt/locust/locustfile.py \
  --host=http://nginx \
  --headless -u 50 -r 5 -t 2m
```

## Project Structure

```
Hanuman/
├── docker-compose.yml         # Service orchestration
├── .env                       # Environment variables
├── secrets/                   # JWT, DB, Redis passwords
├── db/
│   └── init.sql               # Schema: leads, contacts, subscribers, page_views
├── nginx/
│   ├── nginx.conf             # Reverse proxy + SSL + rate limiting
│   └── Dockerfile
├── frontend/
│   ├── Dockerfile             # Multi-stage: Node build → Nginx serve
│   ├── package.json           # React 18 + Vite 5
│   └── src/
│       ├── App.jsx
│       ├── pages/HomePage.jsx
│       ├── components/
│       │   ├── layout/        # Navbar, Footer
│       │   ├── sections/      # Hero, ProofBar, Pricing, etc.
│       │   ├── forms/         # AuditForm
│       │   └── ui/            # LogoMark
│       ├── hooks/             # useScrollAnimation
│       ├── api/               # Axios client
│       └── styles/globals.css # Full design system
├── services/
│   └── lead-service/
│       ├── Dockerfile         # Python 3.11 + Gunicorn
│       ├── requirements.txt
│       └── app/
│           ├── main.py        # Flask app factory
│           ├── models/        # Lead, Contact, Subscriber, PageView
│           └── routes/        # leads.py, misc.py
├── tests/
│   ├── Dockerfile
│   ├── conftest.py
│   └── test_01_leads.py      # 30+ integration tests
└── loadtest/
    └── locustfile.py          # 3 user classes: Visitor, Submitter, Admin
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | #0A2540 | Primary text, hero bg |
| `--teal` | #1D9E75 | CTAs, success states |
| `--blue` | #185FA5 | Secondary accent |
| `--amber` | #BA7517 | Warning states |
| `--coral` | #D85A30 | Error/pain points |
| `--cloud` | #F5F7FA | Page background |

**Fonts**: DM Sans (body) + DM Serif Display (headings)
