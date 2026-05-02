# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-05-02

### Added

#### Backend
- NestJS REST API with global `/api` prefix
- MariaDB database via Prisma ORM with `@@map` / `@map` field-level snake_case mapping
- `BadUSB` model: sub (8-char unique identifier), name, drop location, plugged-in status
- `Questionnaire` model: sub (16-char identifier), linked BadUSB, optional encrypted email, location found, insertion reason (0–4), comfort rating (0–4), malicious flag
- AES-256-CBC encryption for stored email addresses (random IV per entry)
- `POST /api/badusb-hit/:sub` — marks a BadUSB as plugged in (public)
- `POST /api/questionnaire/:sub` — submits a questionnaire response (public)
- `POST /api/auth` — password authentication returning a JWT httpOnly cookie
- Dashboard routes (JWT-protected): list/create/delete BadUSBs, list/delete questionnaire answers, stats
- CSRF protection using the double-submit cookie pattern with `crypto.timingSafeEqual`
- Global `HttpExceptionFilter` returning `{ status: false, error_message }` on all errors
- `GET /api/health` readiness probe
- Input validation with `class-validator` and `class-transformer`
- Database cascade delete: removing a BadUSB automatically removes all its questionnaire answers

#### Frontend
- React SPA with React Router, Tailwind CSS, and shadcn/ui
- `/badusb-hit?id=<sub>` awareness page: alarm banner, meme image, threat cards, questionnaire form
- `/dashboard` page: stats overview, BadUSB table with status badges, add/delete BadUSB, questionnaire answer table with delete
- `/dashboard/badusb/:sub` detail page: questionnaire answers filtered by device
- `/login` page with redirect logic
- Custom 404 page
- Dark theme with red/orange accent

#### Infrastructure
- Multi-stage `Dockerfile` with separate `frontend` (nginx) and `backend` (Node.js) targets
- `docker-compose.yml` with MariaDB, backend, and frontend services
- nginx reverse proxy: serves the SPA and proxies `/api` to the backend container
- MariaDB healthcheck with 180 s start period to accommodate first-boot initialisation
- Backend healthcheck via `/api/health` with `service_healthy` dependency chain
- `.env.template` files for both root (Docker) and backend (local dev)
- Prisma migration file for initial schema

[1.0.0]: https://github.com/mateocallec/security-awareness/releases/tag/v1.0.0
