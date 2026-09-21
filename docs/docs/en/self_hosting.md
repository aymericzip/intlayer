---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Self-Hosting Intlayer
description: Run a complete Intlayer instance on your own infrastructure, as a single all-in-one container or as a scalable Docker Compose stack. No Intlayer Cloud account required.
keywords:
  - Self-Hosting
  - Docker
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
  - Docker Compose
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-Hosting Intlayer

Intlayer can run on your own infrastructure. No Intlayer Cloud account required. Two deployment shapes are published, built from the same source:

| Image                               | What it is                                                                                                  | Pick it for                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `intlayer-selfhost`                 | **All-in-one**: dashboard, API, MongoDB, Redis and MinIO in a single container, supervised by s6-overlay    | Trials and small single-box installs    |
| `intlayer-app` + `intlayer-backend` | **One process per container**: run with the provided [Docker Compose file](#docker-compose-multi-container) | Production, scaling, managed datastores |

One command sets up either of them — or the desktop app, if you only want a native client for the Intlayer Cloud:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

The installer asks which setup you want (**desktop app**, **all-in-one Docker** or **Docker Compose**), checks for Docker (offering to install it), writes the environment file with your secrets already generated, and pulls the images. It then asks you to fill in your mailer credentials and prints the command to start — see [Quick start](#quick-start).

Pass the mode to skip the menu, or run it from the Intlayer CLI, which downloads the same script:

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
npx intlayer init infra --mode compose
```

Nothing external is required: MongoDB, Redis and MinIO all run inside the container.

## Table of Contents

<TOC/>

## Architecture

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      (1-node RS)              (S3 API)     (in-image)
                               minio:9001
                               (console)
```

The same topology applies to both shapes. In the all-in-one image every box is a process inside one container; with Docker Compose every box is its own container on a private network. Chromium (used for Puppeteer screenshot generation) lives inside the backend image in both cases. MongoDB runs as a single-node replica set, which transactions and `w=majority` writes require.

## Prerequisites

- **Docker** ≥ 24. The installer offers to install it for you if it is missing (via [get.docker.com](https://get.docker.com) on Linux, Homebrew on macOS).
- Ports `3000`, `3100`, `9000`, and `9001` available on the host.
- A Linux or macOS host (or WSL2 on Windows).
- A **Resend** API key for transactional email. Get one at [resend.com](https://resend.com). A [global SMTP mailer](#global-mailer) works instead.

Everything else — Bun, MongoDB, Redis, MinIO, Chromium — ships inside the image.

## Quick start

### 1. Run the installer

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Choose **All-in-one Docker** in the menu (or pass `--mode docker`). It verifies Docker is installed and running, writes `./intlayer.env` with `BETTER_AUTH_SECRET` and `S3_SECRET_ACCESS_KEY` already generated, and pulls the image. It does not start the container — first-run setup cannot complete without a working mailer.

Re-running the installer is safe: an existing `intlayer.env` is never overwritten, so it doubles as the upgrade path.

### 2. Fill in your credentials

Open `intlayer.env` and configure a mailer — either a Resend key **or** an SMTP relay:

```sh fileName="intlayer.env"
# Option A — Resend
RESEND_API_KEY=<your-resend-key>

# Option B — SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

The file also carries commented-out blocks for the optional features — an external `MONGODB_URI`, `OPENAI_API_KEY`, and the OAuth providers. Uncomment what you need.

> The file is read by `docker run --env-file`, which does not strip quotes and treats everything after `=` as the value. Write bare values, and keep comments on their own lines.

### 3. Start the container

This is the command the installer prints when it finishes:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

Then open **http://localhost:3000**. First boot initialises the datastores (replica set, bucket), so give it a minute.

> The dashboard is served on `localhost`. See [Limitations](#limitations) — custom domains are not supported by the published images.

### Installer settings

The installer reads a few environment variables. Because it is piped into `sh`, pass them to the shell rather than to `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Default                                       | Description                                                   |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                                     | `desktop`, `docker` or `compose` — same as `--mode`           |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`                                  | Where the Compose mode writes `docker-compose.yml` and `.env` |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`                                 | Where the desktop mode saves the app installer                |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Image to pull                                                 |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Where to write the env file                                   |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Container name                                                |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Named volume mounted at `/data`                               |
| `INTLAYER_APP_PORT`       | `3000`                                        | Host port for the dashboard                                   |
| `INTLAYER_API_PORT`       | `3100`                                        | Host port for the API                                         |
| `INTLAYER_S3_PORT`        | `9000`                                        | Host port for the MinIO S3 API                                |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Host port for the MinIO console                               |

> The four port variables only change the **host** side of the mapping printed in the `docker run` command. The published image has `http://localhost:3000`, `http://localhost:3100` and `http://localhost:9000` compiled into the dashboard bundle at build time, so remapping them leaves the browser pointing at the old ports. Keep the defaults unless you are building your own image — see [Limitations](#limitations).

## Docker Compose (multi-container)

For anything beyond a trial, run one process per container. The stack uses the `intlayer-app` and `intlayer-backend` images plus the official `mongo`, `redis` and `minio` images, so each service can be sized, scaled or replaced by a managed offering independently.

The installer's **Docker Compose** mode fetches the compose file into `./intlayer/`, writes `.env` with the secrets generated, and pulls the images:

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

Either way, configure your mailer in `.env`, then:

```sh
cd intlayer && docker compose up -d
```

Open **http://localhost:3000** and follow [First-run setup](#first-run-setup).

What the file defines:

| Service      | Image              | Role                                                            |
| ------------ | ------------------ | --------------------------------------------------------------- |
| `app`        | `intlayer-app`     | Dashboard on `:3000`, waits for the backend to be healthy       |
| `backend`    | `intlayer-backend` | API on `:3100`, waits for Mongo, Redis and the MinIO bucket     |
| `mongo`      | `mongo:7`          | Single-node replica set `rs0`, initiated by its own healthcheck |
| `redis`      | `redis:7-alpine`   | Queues and caching, append-only persistence                     |
| `minio`      | `minio/minio`      | S3 storage on `:9000`, console on `:9001`                       |
| `minio-init` | `minio/mc`         | One-shot: creates the bucket and its anonymous-download policy  |

Data is kept in the `mongo-data`, `redis-data` and `minio-data` volumes. The service wiring (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`…) is set in the compose file and takes precedence over `.env`, which only carries secrets and optional integrations.

### Using managed datastores

Delete the service you are replacing from the compose file and override the matching variable on `backend`:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

Remove the corresponding `depends_on` entry as well. `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` keep their meaning against any S3-compatible provider.

### Scaling

`app` and `backend` are stateless, so `docker compose up -d --scale backend=3` works once a load balancer sits in front of them (remove the fixed host port mappings first, and reference the services from your proxy). Background jobs are coordinated through Redis (BullMQ), so several backend replicas share the queue safely.

### Building from source

From a checkout of the repository, an override file switches the two Intlayer services from `image:` to `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

This is also how you produce images with a custom domain — pass the `VITE_*` values as build args (see [Limitations](#limitations)).

## First-run setup

On a fresh instance (empty database), opening the dashboard redirects you to the **`/init`** page:

1. Create the first account. Because the users collection is empty, this account is automatically promoted to **super admin**.
2. A verification email is sent (through Resend or your SMTP relay). Email verification is **mandatory** — this is why a mailer must be configured before you start.
3. Click the link in the email, then sign in.

Once an admin exists, `/init` redirects to the standard sign-in page.

## Services

| Service     | Location | Host port(s)                  | Purpose                                                  |
| ----------- | -------- | ----------------------------- | -------------------------------------------------------- |
| **app**     | bundled  | `3000`                        | TanStack Start dashboard (CMS UI)                        |
| **backend** | bundled  | `3100`                        | Fastify REST API (`/health` endpoint)                    |
| **redis**   | bundled  | internal                      | Job queues (BullMQ) and caching (ioredis)                |
| **minio**   | bundled  | `9000` (S3), `9001` (console) | S3-compatible object storage for avatars and screenshots |
| **mongo**   | bundled  | internal                      | MongoDB 7, single-node replica set `rs0`                 |

> MinIO port `9000` must be reachable by the browser because uploaded assets (avatars, screenshots) are loaded directly from `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

## Environment variables

### Required

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Baked-in defaults (override only if needed)

| Variable           | Default                                             | Description                                                                                                                           |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | Backend listening port                                                                                                                |
| `APP_URL`          | `http://localhost:3000`                             | Public URL of the dashboard                                                                                                           |
| `BACKEND_URL`      | `http://localhost:3100`                             | Public URL of the backend API                                                                                                         |
| `DOMAIN`           | `localhost`                                         | Cookie domain                                                                                                                         |
| `SELF_HOSTED`      | `true`                                              | Disables the cloud-only API endpoints: Stripe billing, subscriptions, affiliate and promo-code programs, and the reviewer marketplace |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | Bundled MongoDB. Any `mongodb://` or `mongodb+srv://` string works — point it at Atlas or another cluster to use that instead         |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | Bundled Redis                                                                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | Bundled MinIO (server-to-server)                                                                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | Public URL for browser asset loading                                                                                                  |
| `S3_BUCKET_NAME`   | `intlayer`                                          | Bucket name                                                                                                                           |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | MinIO access key                                                                                                                      |

Defaults above are the all-in-one image's. With Docker Compose the same variables point at the service names instead (`mongodb://mongo:27017/…`, `redis://redis:6379`, `http://minio:9000`).

### Optional (features degrade gracefully when absent)

| Variable                                                 | Feature                                   |
| -------------------------------------------------------- | ----------------------------------------- |
| `OPENAI_API_KEY`                                         | AI-assisted translation and content audit |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Billing and subscription management       |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth login                     |

### Global mailer

Every transactional email — including non-organization emails such as password resets and magic links — goes through one of two global transports:

- **Resend**, using `RESEND_API_KEY`.
- **SMTP**, using the `MAIL_SMTP_*` variables. As soon as `MAIL_SMTP_HOST` is set, SMTP is used and `RESEND_API_KEY` is ignored.

`MAIL_PROVIDER` is only needed to force one transport when both are configured (for instance `MAIL_PROVIDER=resend` to keep Resend while an SMTP host is present).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Precedence: an organization's own mailer (configured from the **Organization** dashboard) takes priority over the global mailer, which in turn takes priority over the default Resend key.

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

## Upgrading

**All-in-one** — re-run the installer to pull the latest image, then recreate the container. Your `intlayer.env` is left untouched, and your data is preserved in the named volume:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
docker rm -f intlayer
# re-run the `docker run …` command from step 3 of Quick start
```

**Docker Compose** — pull and recreate; volumes are kept:

```sh
docker compose pull
docker compose up -d
```

## Backup and restore

In the all-in-one container every datastore lives under the `intlayer-data` volume (`/data/mongo`, `/data/redis`, `/data/minio`). Stop the container first so MongoDB's files are consistent, or take a live dump with `docker exec intlayer mongodump --archive > dump.archive`.

With Docker Compose the equivalent volumes are `intlayer_mongo-data`, `intlayer_redis-data` and `intlayer_minio-data`; the same commands apply to each of them.

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

## Limitations

- **No custom domain, and no port remapping.** All browser-facing `VITE_*` URLs are inlined into the app at build time, and the published images ship with `localhost` values. The dashboard must be accessed at `http://localhost:3000`, the API at `:3100` and MinIO at `:9000`; serving it on a public domain — or on different ports — requires rebuilding the images with the target URLs baked in (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` on `docker/selfhost/Dockerfile`, or through `docker-compose.build.yml`) and is not supported out of the box.
- **Email requires a working mailer.** First-run setup enforces email verification, so either `RESEND_API_KEY` or an [SMTP relay](#global-mailer) (`MAIL_SMTP_*`) must be configured. After the first admin signs in, each organization can also configure its own SMTP or Resend mailer from the dashboard.

## Useful links

- [Intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [`intlayer-selfhost` on GHCR](https://github.com/aymericzip/intlayer/pkgs/container/intlayer-selfhost) — all-in-one image
- [`intlayer-app`](https://github.com/aymericzip/intlayer/pkgs/container/intlayer-app) and [`intlayer-backend`](https://github.com/aymericzip/intlayer/pkgs/container/intlayer-backend) on GHCR — the Compose building blocks
- [Docker Hub](https://hub.docker.com/u/aymericzip) — mirrors of the same builds
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) — Dockerfile, `docker-compose.yml` and `.env.template`
