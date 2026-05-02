# ════════════════════════════════════════
# Stage 1 — Build frontend (Vite/React)
# ════════════════════════════════════════
FROM node:20-alpine AS frontend-builder

# In Docker, VITE_API_URL is empty so all /api/* calls are relative —
# nginx proxies them to the backend container.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ════════════════════════════════════════
# Stage 2 — Build backend (NestJS)
# ════════════════════════════════════════
FROM node:20-alpine AS backend-builder

RUN apk add --no-cache openssl

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend/prisma ./prisma/
COPY backend/nest-cli.json backend/tsconfig.json ./
COPY backend/src ./src/
RUN npx prisma generate && npm run build

# ════════════════════════════════════════
# Target: frontend — nginx + static files
# ════════════════════════════════════════
FROM nginx:alpine AS frontend

COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ════════════════════════════════════════
# Target: backend — Node.js production
# ════════════════════════════════════════
FROM node:20-alpine AS backend

RUN apk add --no-cache openssl

WORKDIR /app
COPY --from=backend-builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/node_modules/.prisma ./node_modules/.prisma
COPY backend/prisma ./prisma/

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
