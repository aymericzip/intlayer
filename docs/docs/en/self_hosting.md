---
createdAt: 2026-06-30
updatedAt: 2026-07-02
title: Self-Hosting Intlayer
description: Run a complete Intlayer instance on your own infrastructure with a single container. No Intlayer Cloud account required.
keywords:
  - Self-Hosting
  - Docker
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

Intlayer can run on your own infrastructure — no Intlayer Cloud account required. A single all-in-one Docker image bundles the dashboard, the API, and the local datastores (Redis and MinIO) it needs, supervised by [s6-overlay](https://github.com/just-containers/s6-overlay).

The only external dependency is **MongoDB**: the backend connects to a MongoDB **Atlas** cluster, which you provide. Everything else runs inside the container.

## Table of Contents

<TOC/>

---

## Architecture

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼───────────────────────┐
          ▼          ▼         ▼                        ▼
       redis:6379  minio:9000  Chromium            MongoDB Atlas
       (bundled)   (S3 API)    (in-image)          (external, via DB_*)
                   minio:9001
                   (console)
```

Chromium (used for Puppeteer screenshot generation) is bundled inside the image — no separate container is needed. Redis and MinIO run inside the container. MongoDB is **not** hosted by the image; the backend connects to your Atlas cluster over `mongodb+srv://`.

---

## Prerequisites

- **Docker** ≥ 24.
- Ports `3000`, `3100`, `9000`, and `9001` available on the host.
- A Linux or macOS host (or WSL2 on Windows).
- A **MongoDB Atlas** cluster (a free tier works). Create one at [mongodb.com/atlas](https://www.mongodb.com/atlas).
- A **Resend** API key for transactional email. Get one at [resend.com](https://resend.com).

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

## First-run setup

On a fresh instance (empty database), opening the dashboard redirects you to the **`/init`** page:

1. Create the first account. Because the users collection is empty, this account is automatically promoted to **super admin**.
2. A verification email is sent (via Resend). Email verification is **mandatory** — this is why `RESEND_API_KEY` must be set before you start.
3. Click the link in the email, then sign in.

Once an admin exists, `/init` redirects to the standard sign-in page.

---

## Services

| Service     | Location           | Host port(s)                  | Purpose                                                       |
| ----------- | ------------------ | ----------------------------- | ------------------------------------------------------------- |
| **app**     | bundled            | `3000`                        | TanStack Start dashboard (CMS UI)                             |
| **backend** | bundled            | `3100`                        | Fastify REST API (`/health` endpoint)                         |
| **redis**   | bundled            | internal                      | Job queues (BullMQ) and caching (ioredis)                     |
| **minio**   | bundled            | `9000` (S3), `9001` (console) | S3-compatible object storage for avatars and screenshots      |
| **mongo**   | **external** (you) | —                             | MongoDB Atlas, provided via `DB_ID` / `DB_MDP` / `DB_CLUSTER` |

> MinIO port `9000` must be reachable by the browser because uploaded assets (avatars, screenshots) are loaded directly from `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Environment variables

### Required

| Variable               | Example                      | Description                                                   |
| ---------------------- | ---------------------------- | ------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                            |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                        |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI) |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                  |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email; required to complete first-run setup     |

### Baked-in defaults (override only if needed)

| Variable           | Default                          | Description                          |
| ------------------ | -------------------------------- | ------------------------------------ |
| `PORT`             | `3100`                           | Backend listening port               |
| `APP_URL`          | `http://localhost:3000`          | Public URL of the dashboard          |
| `BACKEND_URL`      | `http://localhost:3100`          | Public URL of the backend API        |
| `DOMAIN`           | `localhost`                      | Cookie domain                        |
| `REDIS_URL`        | `redis://127.0.0.1:6379`         | Bundled Redis                        |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`          | Bundled MinIO (server-to-server)     |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer` | Public URL for browser asset loading |
| `S3_BUCKET_NAME`   | `intlayer`                       | Bucket name                          |
| `S3_ACCESS_KEY_ID` | `intlayer`                       | MinIO access key                     |

### Optional (features degrade gracefully when absent)

| Variable                                                 | Feature                                   |
| -------------------------------------------------------- | ----------------------------------------- |
| `OPENAI_API_KEY`                                         | AI-assisted translation and content audit |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Billing and subscription management       |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth login                     |

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

Pull the latest image and recreate the container. Your data is preserved in the named volume (MinIO/Redis) and in your Atlas cluster (MongoDB):

```sh
docker pull aymericzip/intlayer-selfhost
docker stop intlayer && docker rm intlayer
# re-run the `docker run …` command from Quick start
```

---

## Backup and restore

MongoDB data lives in your Atlas cluster — back it up with Atlas' own tools. The bundled local datastores live under the `intlayer-data` volume.

### Backup

```sh
docker run --rm \
  -v intlayer-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/intlayer-data.tar.gz /data
```

### Restore

```sh
docker run --rm \
  -v intlayer-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

---

## Limitations

- **MongoDB must be external (Atlas).** The backend connects only over `mongodb+srv://` (built from `DB_ID` / `DB_MDP` / `DB_CLUSTER`), so a plain `mongodb://host:27017` — including the container's own bundled `mongod` — cannot be used. Provide a MongoDB Atlas cluster.
- **No custom domain.** All browser-facing `VITE_*` URLs are inlined into the app at build time, and the published image ships with `localhost` values. The dashboard must be accessed at `http://localhost:3000`; serving it on a public domain would require rebuilding the image with the target URLs baked in and is not supported out of the box.
- **Email requires Resend.** First-run setup enforces email verification, so `RESEND_API_KEY` must be set. After the first admin signs in, each organization can configure its own SMTP or Resend mailer from the dashboard.

---

## Troubleshooting

### Dashboard loads but the API resets the connection (`ERR_CONNECTION_RESET` on `:3100`)

The backend crashed on startup and is not listening. The most common cause is a missing or invalid MongoDB connection: check that `DB_ID`, `DB_MDP`, and `DB_CLUSTER` are set and correct.

```sh
docker logs intlayer
```

Look for `MongoDB connection error` near the top of the log.

### First account can't be verified

Email verification is mandatory. Make sure `RESEND_API_KEY` is set and valid, then re-check your inbox (and spam). Without a working mailer, the verification link is never delivered.

### MinIO bucket missing

The `init-minio` one-shot creates the bucket on first boot. If assets fail to load, restart the container so it runs again:

```sh
docker restart intlayer
```

---

## Useful links

- [Intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
