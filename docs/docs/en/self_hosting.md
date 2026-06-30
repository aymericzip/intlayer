---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Self-Hosting Intlayer
description: Run a complete Intlayer instance on your own infrastructure with a single command. No Intlayer Cloud account required.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-Hosting Intlayer

Intlayer can run entirely on your own infrastructure — no Intlayer Cloud account required. A single command boots a production-ready stack:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

The installer downloads a `docker-compose.yml` and a `.env`, auto-generates the required secrets, and starts all containers with `docker compose up -d`.

## Table of Contents

<TOC/>

---

## Architecture

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium (used for Puppeteer screenshot generation) is bundled inside the backend image — no separate container is needed.

---

## Prerequisites

- **Docker** ≥ 24 and **Docker Compose** ≥ v2. If either is missing, the installer prints the install link and exits.
- Ports `3000`, `3100`, `8025`, `9000`, and `9001` available on the host.
- A Linux or macOS host (or WSL2 on Windows).

---

## Quick start

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

What the installer does:

1. Checks that `docker` and `docker compose` are present.
2. Downloads `docker-compose.yml` and `.env.example` into `./intlayer/`.
3. If no `.env` exists, copies the example and generates random secrets for `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` via `openssl rand`.
4. Runs `docker compose pull` + `docker compose up -d`.
5. Prints the URLs: dashboard `:3000`, API `:3100`, email UI `:8025`, MinIO console `:9001`.

After the stack is up, open **http://localhost:3000** and create your first account.

---

## Services

| Service     | Image                                | Host port(s)                   | Purpose                                                  |
| ----------- | ------------------------------------ | ------------------------------ | -------------------------------------------------------- |
| **app**     | built from `apps/app/Dockerfile`     | `3000`                         | TanStack Start dashboard (CMS UI)                        |
| **backend** | built from `apps/backend/Dockerfile` | `3100`                         | Fastify REST API (`/health` endpoint)                    |
| **mongo**   | `mongo:7`                            | internal                       | Single-node replica set (`rs0`)                          |
| **redis**   | `redis:7-alpine`                     | internal                       | Job queues (BullMQ) and caching (ioredis)                |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (console)  | S3-compatible object storage for avatars and screenshots |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (web UI) | Local transactional email sink                           |

Internal ports (mongo, redis) are not exposed to the host by default.

> MinIO port `9000` must be reachable by the browser because uploaded assets (avatars, screenshots) are loaded directly from `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Environment variables

The installer generates a ready-to-use `.env`. The table below describes every variable.

### Required (auto-generated or prompted)

| Variable               | Example                                         | Description                                        |
| ---------------------- | ----------------------------------------------- | -------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Runtime environment                                |
| `PORT`                 | `3100`                                          | Backend listening port                             |
| `BACKEND_URL`          | `http://localhost:3100`                         | Public URL of the backend API                      |
| `APP_URL`              | `http://localhost:3000`                         | Public URL of the dashboard                        |
| `DOMAIN`               | `localhost`                                     | Cookie domain                                      |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Full MongoDB connection URI                        |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis connection URL                               |
| `BETTER_AUTH_SECRET`   | _(generated)_                                   | 32-byte secret for session signing                 |
| `MAIL_PROVIDER`        | `smtp`                                          | Mail transport: `smtp` or `resend`                 |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP hostname (Mailpit container name)             |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP port                                          |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Sender address                                     |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3-compatible endpoint                             |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Public URL for browser asset loading               |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Bucket name                                        |
| `S3_ACCESS_KEY_ID`     | _(generated)_                                   | MinIO access key                                   |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                                   | MinIO secret key                                   |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | Backend URL baked into the dashboard at build time |
| `VITE_DOMAIN`          | `localhost`                                     | Domain baked into the dashboard at build time      |

### Optional (features degrade gracefully when absent)

| Variable                                                 | Feature                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | AI-assisted translation and content audit                   |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Billing and subscription management                         |
| `RESEND_API_KEY`                                         | Transactional email via Resend (overrides Mailpit when set) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth login                                          |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth login                                          |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth login                                          |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth login                                       |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth login                                        |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth login                                       |

---

## Connecting your Intlayer project

Once the stack is running, point your project at the self-hosted backend and dashboard instead of `intlayer.org`.

### Project configuration

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Create access credentials in your self-hosted dashboard under **Projects → Access keys** at `http://localhost:3000/projects`.

### `@intlayer/api` SDK

When using the `@intlayer/api` SDK programmatically, pass `backendURL` explicitly:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

---

## Upgrading

Re-running the installer on an existing deployment performs a rolling upgrade:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

This pulls the latest images and restarts containers with `docker compose pull && docker compose up -d`. Existing volumes (`mongo-data`, `redis-data`, `minio-data`) are preserved — no data loss.

To upgrade manually from inside the `./intlayer/` directory:

```sh
docker compose pull
docker compose up -d
```

---

## Backup and restore

All persistent data lives in three named Docker volumes.

### Backup

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Restore

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Repeat for redis-data and minio-data
```

---

## Using a reverse proxy (Nginx / Caddy)

For production deployments, place a reverse proxy in front of the app and backend containers instead of exposing them directly.

### Nginx example

```nginx
server {
    listen 80;
    server_name cms.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Update the following `.env` variables to match your public domains:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> `VITE_*` variables are baked into the dashboard image at build time. If you change them after the image is built, you need to rebuild the `app` image (`docker compose build app`) or use runtime config injection.

---

## Troubleshooting

### Backend crash-loops on first start

MongoDB and Redis must be healthy before the backend starts. The compose file uses `depends_on` with `condition: service_healthy`. If you see repeated backend restarts, check that the `mongo` and `redis` healthchecks pass:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Dashboard cannot reach the API

Verify that `VITE_BACKEND_URL` matches the URL where the backend is reachable from the **browser** (not the Docker network). If you changed the backend port or added a reverse proxy, rebuild the dashboard image:

```sh
docker compose build app
docker compose up -d app
```

### Email not sending

By default, all outbound email is captured by Mailpit. Open `http://localhost:8025` to see sent messages. To send real email, set `MAIL_PROVIDER=resend` and `RESEND_API_KEY=<your-key>` in `.env`, then restart the backend:

```sh
docker compose restart backend
```

### MinIO bucket missing

If the `minio-init` one-shot service didn't run (or ran before MinIO was ready), create the bucket manually:

```sh
docker compose run --rm minio-init
```

---

## Useful links

- [Intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
