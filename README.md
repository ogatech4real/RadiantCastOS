# RadiantCastOS

RadiantCastOS is a **multi-tenant internet radio hosting platform**:
- Station provisioning + keys
- Scheduling + playlists (control plane)
- Stream Router (data-plane orchestrator) that switches sources and produces HLS output

This repository is structured for a **production-ready architecture**:
- Control plane is stateless and connects to **Supabase Postgres**
- Router authenticates to the control plane with a service token
- Source switching uses **desired-state** (not “latest event scan”)

---

## What runs where

### Control Plane (FastAPI)
Responsible for:
- station lifecycle
- RBAC/auth (via Supabase Auth JWT validation)
- desired-state: which source should play now (live/autodj/fallback)
- audit events

### Router (FFmpeg Orchestrator)
Responsible for:
- producing the actual HLS stream per station
- switching sources based on desired-state + health rules
- emitting heartbeat and runtime telemetry (optional)

---

## Local end-to-end demo (Docker)

### 1) Start stack
```bash
cd infra
docker compose up --build
```

### 2) Create demo station
```bash
curl -X POST http://localhost:8000/stations \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo FM","slug":"demo-fm"}'
```

### 3) Play HLS
- http://localhost:8080/hls/demo-fm/index.m3u8

### 4) Switch source (desired-state)
Get station id:
```bash
curl http://localhost:8000/stations/demo-fm
```

Switch to live (replace STATION_ID):
```bash
curl -X POST "http://localhost:8000/stations/STATION_ID/desired-source" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer change-me-long-random" \
  -d '{"desired_source":"live","reason":"demo"}'
```

---

## Production checklist (high level)

- Use Supabase Postgres with SSL
- Use Supabase Auth for user JWTs (JWKS validation enabled)
- Put the API behind a reverse proxy / API gateway with TLS
- Set strong `ROUTER_SERVICE_TOKEN` and rotate periodically
- Enable logging + error reporting (Sentry)
- Apply least privilege:
  - Router token can only call internal endpoints
  - Users can only manage their own stations (RBAC layer)


## Seamless Vercel autobuild

Vercel will auto-detect the Next.js app under `apps/web` via `vercel.json`.

On Vercel:
- Framework: Next.js (auto)
- Build command: (auto)
- Output: (auto)

Set environment variable:
- `NEXT_PUBLIC_API_BASE_URL` to the deployed Control Plane API URL (not localhost).

