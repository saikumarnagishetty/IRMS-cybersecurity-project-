# IRMS — Incident Response Management System

A full-stack incident response workspace built with React + Vite, Node.js + Express, MongoDB/Mongoose and Socket.IO.

## Modules

- **Authentication & RBAC:** bcrypt password hashes, JWT sessions, account activation, role-based API permissions, login rate limiting and password change.
- **Incident management:** searchable/filterable register, lifecycle statuses, ownership, priority/severity, SLA due dates, comments and live updates.
- **Evidence management:** allow-listed file types, upload size limits, generated storage names, server-side SHA-256 digests, integrity verification before download and custody events.
- **Teams & users:** team records, member/lead references, user provisioning and role administration.
- **Task assignment:** incident-linked tasks, assignees, priorities, deadlines and completion tracking.
- **Timeline & audit:** persistent incident activity, comments and administrative/security audit records.
- **Notifications:** per-user in-app notifications with read/unread state.
- **Reports:** live summary metrics, priority/status/category/department breakdowns, monthly trends, SLA overdue counts, average resolution hours, CSV and PDF exports.
- **Security baseline:** Helmet, CORS allow-list, JSON body limits, login rate limiting, server-side validation through Mongoose and protected API routes.

## Requirements

- Node.js 20+
- MongoDB 6+
- npm

## Local setup

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/saikumarnagishetty/IRMS-cybersecurity-project-.git
   cd IRMS-cybersecurity-project-
   npm install
   ```
2. Configure the backend:
   ```bash
   copy backend\\.env.example backend\\.env (Windows CMD)\n   # macOS/Linux: cp backend/.env.example backend/.env
   ```
   Set `MONGODB_URI`, `CLIENT_ORIGIN`, and a unique random `JWT_SECRET` of at least 32 characters. Keep `backend/.env` private.
3. Provision the first administrator (password must be at least 12 characters):
   ```bash
   npm run create-admin -- "IRMS Administrator" admin@example.com "Use-A-Long-Unique-Password!"
   ```
4. Start the frontend and API:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173. API health: http://localhost:5000/api/health.

Optional frontend API override: copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## Docker deployment\n\nFor a local container deployment with MongoDB, API, frontend, persistent database volume and persistent evidence volume:\n\n1. Create a root `.env` file containing `JWT_SECRET` with at least 32 random characters.\n2. Run `docker compose up --build -d`.\n3. Open http://localhost:8080. The frontend Nginx container reverse-proxies `/api` and Socket.IO to the backend.\n4. Provision the first administrator from the running API container:\n   `docker compose exec api node scripts/create-admin.js "IRMS Administrator" admin@example.com "Use-A-Long-Unique-Password!"`\n5. View service logs with `docker compose logs -f api web`.\n\nThis Compose file is a convenient single-host baseline, not a hardened public production deployment. For internet exposure, put the stack behind TLS, use MongoDB authentication and network isolation, restrict inbound ports, set the exact public `CLIENT_ORIGIN`, build the frontend with the public API/reverse-proxy origin, use managed secrets, and configure encrypted off-host backups.\n\n## Tests and build

```bash
npm test
npm run build
```

## Evidence storage and operational notes

Evidence is stored under `backend/storage/evidence` by default (override with `UPLOAD_DIR`). Back up this directory and MongoDB together. Configure `ALLOWED_EVIDENCE_TYPES` and `MAX_EVIDENCE_BYTES` to match your institution's evidence policy. The API records a SHA-256 digest and custody event at upload; it recalculates the digest before serving a download and blocks the download if the digest differs.

The current implementation stores evidence on the application host. For production, use private object storage with encryption, malware scanning, immutable retention/versioning, key management and tested backup/restore. Add a formal evidence retention policy and legal chain-of-custody procedures before using this for real investigations.

## Roles

- **Admin:** user administration, teams, incident deletion, audit access and all operational actions.
- **Incident Manager:** team/incident/task administration and audit access.
- **Analyst:** create and investigate incidents, upload evidence and create tasks.
- **Responder:** update response tasks and upload evidence.
- **Viewer:** intended for read-only operational access; enforce read-only restrictions in any new endpoints before production use.

## Important security notice

This is an academic/project implementation and has not been independently penetration-tested or validated against a formal incident-response standard. Before production use, add comprehensive authorization tests (including object-level access), malware scanning, immutable evidence storage, refresh-token/session revocation, password reset/MFA, CSRF strategy if cookie auth is introduced, secrets management, monitoring, backups, restore drills and deployment hardening. Do not upload real confidential or regulated evidence to an unreviewed deployment.
