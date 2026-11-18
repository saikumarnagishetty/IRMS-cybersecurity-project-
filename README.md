# IRMS — Incident Response Management System

A full-stack Incident Response Management System built with React + Vite, Node.js + Express, MongoDB/Mongoose and Socket.IO.

## Implemented modules

- **Authentication and access control:** bcrypt password hashing, JWT sessions, active-account checks, role checks on API routes, login/API rate limits, password changes and token-version session revocation when a password changes or an account is disabled.
- **Incident management:** searchable and filterable incident register, lifecycle status, priority/severity, assignment, SLA due dates, comments, incident activity timeline and live incident refresh.
- **Evidence management:** file size and MIME allow-lists, server-side file-content signature validation, generated storage names, SHA-256 digest, integrity verification before download and custody events.
- **Teams and users:** team creation, editing, deletion, lead/member assignment, user provisioning, role management and account activation/deactivation.
- **Tasks:** incident-linked tasks, assignment, priority, due date, completion tracking and role/assignee-based update restrictions.
- **Notifications:** per-user in-app notifications with read/unread controls.
- **Audit trail:** administrative and security-relevant actions with actor, resource, timestamp, IP and user-agent metadata.
- **Reports:** operational summary, priority/status/category/department breakdowns, monthly trends, SLA overdue counts, average resolution time, CSV and PDF exports.
- **Deployment:** Dockerfiles, Docker Compose, persistent MongoDB/evidence volumes, Nginx API/socket reverse proxy and GitHub Actions CI.

## Requirements

- Node.js 20 or newer
- MongoDB 6 or newer (local installation or Docker)
- npm

## Windows Command Prompt setup

Run these commands from the folder where you want the project:

```cmd
git clone https://github.com/saikumarnagishetty/IRMS-cybersecurity-project-.git
cd IRMS-cybersecurity-project-
npm install
copy backend\.env.example backend\.env
```

Open `backend\.env` and set a unique random `JWT_SECRET` with at least 32 characters. Keep this file private. Confirm that `MONGODB_URI` points to your running MongoDB instance.

Start MongoDB in a separate Command Prompt window if it is installed as a standalone service:

```cmd
mongod
```

If MongoDB is already running as a Windows service, do not start a second `mongod` process.

Create the first administrator (replace the example credentials with your own):

```cmd
npm run create-admin -w backend -- "IRMS Administrator" admin@example.com "Use-A-Long-Unique-Password!"
```

Start the frontend and backend:

```cmd
npm run dev
```

Open the frontend at http://localhost:5173. The API health endpoint is http://localhost:5000/api/health and should return HTTP 200 without a login token.

## Run tests and build

From the repository root:

```cmd
npm test
npm run build
```

The tests include role-middleware checks, evidence content-validation checks and an unauthenticated API health-check smoke test. These do not replace full end-to-end tests against a real MongoDB instance.

## Docker setup

Create a root `.env` file with a unique random `JWT_SECRET` of at least 32 characters, then run:

```cmd
docker compose up --build -d
docker compose exec api node scripts/create-admin.js "IRMS Administrator" admin@example.com "Use-A-Long-Unique-Password!"
docker compose logs -f api web
```

Open http://localhost:8080. Stop the stack with `docker compose down`. To also remove database and evidence volumes, use `docker compose down -v` (this permanently deletes the persisted data).

## Environment variables

See `backend/.env.example`. Important values:

- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: unique secret of at least 32 characters.
- `JWT_EXPIRES_IN`: JWT lifetime (default 8h).
- `CLIENT_ORIGIN`: comma-separated allowed frontend origins.
- `UPLOAD_DIR`: evidence storage directory.
- `MAX_EVIDENCE_BYTES`: maximum evidence upload size.
- `ALLOWED_EVIDENCE_TYPES`: allowed MIME types.

## Roles

- **Admin:** user and team administration, incident/task administration, audit access and deletion actions.
- **Incident Manager:** team management, incident/task administration and audit access.
- **Analyst:** create and investigate incidents, create tasks and upload evidence.
- **Responder:** view incidents assigned to their account, update assigned incident status, update assigned tasks and upload evidence for assigned incidents.
- **Viewer:** read-only operational access.

## Security and operational limitations

This is an academic/project implementation. It has not been independently penetration-tested or certified against a formal incident-response standard. Evidence file content is checked against supported signatures, but the application does not include antivirus/sandbox scanning. Local disk evidence storage is not immutable WORM storage. Production use still requires TLS, managed secrets, MongoDB authentication/network isolation, malware scanning, encrypted immutable evidence storage, tested off-host backups and restore drills, monitoring, MFA, account recovery and a formal evidence retention/chain-of-custody policy. Do not upload real confidential or regulated evidence to an unreviewed deployment.

## Testing boundary

GitHub Actions can verify dependency installation, automated tests and frontend compilation. A successful build does not prove a complete live deployment. Final acceptance requires running the commands above on the target Windows machine with MongoDB available, creating an administrator, testing every role and workflow, and checking browser/network logs.
