# Security Awareness

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](docker-compose.yml)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GHCR](https://img.shields.io/badge/GHCR-ghcr.io%2Fmateocallec%2Fsecurity--awareness-24292e?logo=github&logoColor=white)](https://github.com/mateocallec/security-awareness/pkgs/container/security-awareness)

> Academic project for the **Human Aspects of Information Security** course at **FH Hagenberg** (University of Applied Sciences Upper Austria).

The goal of this project is to study human behaviour in response to physical USB-based social engineering attacks. BadUSB devices are intentionally placed in a public or office environment. When someone plugs one in, their browser is redirected to an awareness page that explains what could have happened and invites them to fill in an anonymous questionnaire. The collected data is then analysed to better understand why people plug in unknown USB drives and how to improve security awareness training.

---

> **Legal disclaimer** — Deploying USB drives and recording interactions without the explicit, informed consent of participants may be **illegal** depending on your local jurisdiction (e.g. computer fraud, unauthorised access, or privacy laws). This project was conducted under academic supervision with appropriate ethical oversight. **The authors of this repository are not responsible for any misuse.** Always obtain written consent from your institution and, where required, from participants before running any similar experiment.

---

## Stack

| Layer | Technologies |
|---|---|
| **Backend** | NestJS · TypeScript · Prisma ORM · MariaDB · JWT (httpOnly cookie) · AES-256-CBC (email encryption) · CSRF double-submit |
| **Frontend** | React · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router |
| **Infrastructure** | Docker · Docker Compose · nginx (reverse proxy + SPA routing) |

---

## Quick start

### Prerequisites

- Docker and Docker Compose v2

### 1. Clone

```bash
git clone https://github.com/mateocallec/security-awareness.git
cd security-awareness
```

### 2. Configure environment

```bash
cp .env.template .env
```

Edit `.env` and fill in every value:

| Variable | Description |
|---|---|
| `DB_ROOT_PASSWORD` | MariaDB root password |
| `DB_NAME` | Database name (e.g. `security_awareness`) |
| `DB_USER` | Application database user |
| `DB_PASSWORD` | Application database password |
| `JWT_SECRET` | Random secret for JWT signing — `openssl rand -hex 64` |
| `DASHBOARD_PASSWORD` | Password to access the dashboard |
| `ENCRYPTION_KEY` | 32-byte AES key (hex) — `openssl rand -hex 32` |
| `HTTP_PORT` | Host port for the frontend (default `80`) |

### 3. Build and run

```bash
docker compose up -d --build
```

The application will be available at `http://localhost` (or the configured `HTTP_PORT`).

> **Note** — MariaDB performs a full initialisation on first boot which can take up to 2 minutes depending on your system. The backend and frontend containers wait for the database to be healthy before starting.

### 4. Use the application

| URL | Description |
|---|---|
| `http://localhost/dashboard` | Admin dashboard (password-protected) |
| `http://localhost/login` | Dashboard login |
| `http://localhost/badusb-hit?id=<SUB>` | Awareness page shown when a USB is plugged in |

The `<SUB>` value is the 8-character identifier assigned to each BadUSB device when created from the dashboard.

---

## Using the pre-built image

The Docker image is published to the GitHub Container Registry:

```bash
docker pull ghcr.io/mateocallec/security-awareness:latest
```

---

## Local development

### Backend

```bash
cd backend
cp .env.template .env   # fill in values
npm install
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:3000` in `frontend/.env.local` so the dev server proxies to the local backend.

---

## Repository structure

```
security-awareness/
├── backend/          # NestJS REST API
│   ├── prisma/       # Schema and migrations
│   └── src/
├── frontend/         # React SPA
│   └── src/
├── nginx.conf        # nginx config for the frontend container
├── Dockerfile        # Multi-stage build (frontend + backend targets)
├── docker-compose.yml
└── .env.template
```

---

## License

See [LICENSE](LICENSE).

## Authors

**Matéo Florian Callec** — [mateo@callec.net](mailto:mateo@callec.net)

**Simon Jung**

**Manuel Pramberger**

**Jakob Wagner**
