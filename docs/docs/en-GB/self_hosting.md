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

Intlayer can run entirely on your own infrastructure. No Intlayer Cloud account required. A single command boots a production-ready stack:

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

Chromium (used for Puppeteer screenshot generation) is bundled inside the backend image. No separate container is needed.

---

## Prerequisites

- **Docker** ≥ 24 and **Docker Compose** ≥ v2. If either is missing, the installer prints the install link and exits.
- Ports `3000`, `3100`, `8025`, `9000`, and `9001` available on the host.
- A Linux or macOS host (or WSL2 on Windows).

---

## Quick start

Pull and run the published image, supplying your MongoDB Atlas credentials and secrets:

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e DB_ID="<atlas-user>" \
  -e DB_MDP="<atlas-password>" \
  -e DB_CLUSTER="<cluster>.xxxxx.mongodb.net" \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  aymericzip/intlayer-selfhost
```

Then open **http://localhost:3000**.

> The dashboard is served on `localhost`. See [Limitations](#limitations) — custom domains are not supported by the published image.

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

### Required

| Variable               | Example                      | Description                                                                                                                                  |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                                                                                                           |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                                                                                                       |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI)                                                                                |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                                                                                                 |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email via Resend. Required for first-run setup unless you configure a global SMTP mailer (see [Global mailer](#global-mailer)) |

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

### Global mailer

By default, all transactional emails are sent through Resend using `RESEND_API_KEY`. Self-hosted deployments can instead route **every** email — including non-organisation emails such as password resets and magic links — through a global mailer configured with environment variables.

Set `MAIL_PROVIDER` to activate it. When unset, the default Resend mailer is used.

| Variable             | Example                        | Description                                                       |
| -------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` or `resend`. Leave unset to use defaults |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header. Accepts a bare address or `Name <email>` format    |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (required when `MAIL_PROVIDER=smtp`)                    |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                     |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                           |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)         |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                     |

> Precedence: an organisation's own mailer (configured from the **Organisation** dashboard) takes priority over the global mailer, which in turn takes priority over the default Resend key.

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

## Limitations

- **MongoDB must be external (Atlas).** The backend connects only over `mongodb+srv://` (built from `DB_ID` / `DB_MDP` / `DB_CLUSTER`), so a plain `mongodb://host:27017` — including the container's own bundled `mongod` — cannot be used. Provide a MongoDB Atlas cluster.
- **No custom domain.** All browser-facing `VITE_*` URLs are inlined into the app at build time, and the published image ships with `localhost` values. The dashboard must be accessed at `http://localhost:3000`; serving it on a public domain would require rebuilding the image with the target URLs baked in and is not supported out of the box.
- **Email requires a working mailer.** First-run setup enforces email verification, so either `RESEND_API_KEY` or a [global SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) must be configured. After the first admin signs in, each organisation can also configure its own SMTP or Resend mailer from the dashboard.

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

### MinIO bucket missing

If the `minio-init` one-shot service didn't run (or ran before MinIO was ready), create the bucket manually:

```sh
docker compose run --rm minio-init
```

---

## Useful links

- [Intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
