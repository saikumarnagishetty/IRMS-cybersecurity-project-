# IRMS — Incident Response Management System

React + Vite frontend and Node.js + Express + MongoDB + Socket.IO backend.

## Run locally
1. Install Node.js 20+ and MongoDB.
2. Run `npm install` from the repository root.
3. Copy `backend/.env.example` to `backend/.env`.
4. Set a long random `JWT_SECRET`, a valid `MONGODB_URI`, and `CLIENT_ORIGIN=http://localhost:5173`.
5. Run `npm run dev`.
6. Open http://localhost:5173. API health: http://localhost:5000/api/health.

## Authentication provisioning
The login endpoint expects a MongoDB `users` collection containing `email`, `passwordHash`, `name`, and `role`. Passwords must be bcrypt hashes. Create the first administrator through a trusted provisioning script or database administration process; never store plaintext passwords.

## Implemented foundation
- Responsive enterprise SOC dashboard and login screen.
- MongoDB-backed incident create, read, update and delete.
- Unique incident identifiers, status and priority filters, global incident search.
- JWT-protected API routes and manager-only incident deletion.
- Live incident refresh via Socket.IO.
- Dynamic summary metrics calculated from MongoDB.

## Remaining specification work
Evidence uploads, SHA-256 chain of custody, team and task management, persistent timeline/audit records, notification center, PDF/CSV reports, user administration, and automated end-to-end tests are not implemented yet. Monthly historical analytics are not yet available. This repository is an initial working foundation, not a claim that every requested module is complete.

Do not use this application to manage real security incidents or evidentiary material until security review, comprehensive validation, audit controls, backup, and deployment hardening are complete.