# Contributing

Thank you for considering a contribution to Security Awareness. This document explains how to get the project running locally and what to keep in mind before opening a pull request.

## Code of Conduct

Please read and follow the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Reporting bugs

Open a [GitHub issue](https://github.com/mateocallec/security-awareness/issues) with:

- A clear title and description
- Steps to reproduce
- Expected vs actual behaviour
- Environment details (OS, Docker version, browser)

For security vulnerabilities, **do not** open a public issue — see [SECURITY.md](SECURITY.md).

## Suggesting features

Open an issue with the `enhancement` label. Check the [ROADMAP.md](ROADMAP.md) first to avoid duplicates.

## Development setup

### Requirements

- Node.js 20+
- Docker + Docker Compose v2
- A running MariaDB instance (or use the provided `docker-compose.yml`)

### Backend

```bash
cd backend
cp .env.template .env   # fill in all values
npm install
npx prisma migrate dev
npm run start:dev        # starts on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
# Create frontend/.env.local with:
# VITE_API_URL=http://localhost:3000
npm run dev              # starts on http://localhost:5173
```

## Pull request guidelines

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Keep changes focused** — one feature or fix per PR. Large changes are harder to review and more likely to conflict.

3. **Follow the existing code style**:
   - Backend: NestJS conventions, no inline comments unless the intent is non-obvious
   - Frontend: React functional components, Tailwind utility classes, shadcn/ui components
   - No new dependencies without prior discussion

4. **Test your changes** manually against both the development server and a `docker compose up --build` run.

5. **Update the CHANGELOG** under an `[Unreleased]` section following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

6. Open the PR against `main` with a clear description of what was changed and why.

## Commit style

Use short, imperative commit messages:

```
add logout endpoint to auth module
fix CSRF token not cleared on logout
update nginx config to support WebSocket upgrade
```

## License

By contributing, you agree that your contributions will be licensed under the same license as this project (see [LICENSE](LICENSE)).
