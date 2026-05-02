# Roadmap

This document outlines planned features and improvements. Nothing here represents a commitment or a fixed timeline.

---

## v1.1.0 — Dashboard quality of life

- [ ] **Logout** — Dedicated `POST /api/auth/logout` endpoint that clears the JWT and CSRF cookies server-side; logout button wired in the dashboard header

## v1.2.0 — Analytics

- [ ] **Stats charts** — Visual breakdown of insertion reasons and comfort ratings using a charting library
- [ ] **Per-device stats** — Individual hit count and response rate displayed on the BadUSB detail page
- [ ] **Time-series view** — Timeline of plug-in events and questionnaire submissions
- [ ] **BadUSB status reset** — Allow manually resetting a device status from "plugged in" back to "dropped" from the dashboard
- [ ] **Questionnaire detail view** — Click on a single questionnaire entry to see its full details in a modal or dedicated page
- [ ] **CSV / JSON export** — Download all questionnaire answers for a given BadUSB or for the entire campaign

## v1.3.0 — Security & operations

- [ ] **Rate limiting** — Throttle public endpoints (`/api/badusb-hit`, `/api/questionnaire`) to prevent abuse
- [ ] **HTTPS support** — TLS termination in nginx with Let's Encrypt / custom certificate mounting
- [ ] **Audit log** — Record dashboard actions (device created/deleted, answer deleted) with timestamp
- [ ] **Two-factor authentication** — Optional TOTP on top of the dashboard password

## v2.0.0 — Multi-campaign support

- [ ] **Campaigns** — Group BadUSB devices under named campaigns with separate date ranges and settings
- [ ] **Multi-user dashboard** — Role-based access (admin, read-only analyst)
- [ ] **Localisation** — Translate the awareness page and questionnaire into multiple languages

---

## Completed

- [x] Core backend API (v1.0.0)
- [x] Awareness hit page with questionnaire (v1.0.0)
- [x] Admin dashboard (v1.0.0)
- [x] CSRF protection (v1.0.0)
- [x] AES-256 email encryption (v1.0.0)
- [x] Docker Compose deployment (v1.0.0)
