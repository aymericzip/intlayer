---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Self-Hosting Intlayer
description: "Run Intlayer on your own infrastructure: as a desktop app, a single all-in-one Docker container, or a scalable Docker Compose stack. No Intlayer Cloud account required."
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Desktop app
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

Intlayer can run on your own infrastructure, no Intlayer Cloud account required. Three setups are available, all driven by the same installer (`install.sh`, `install.ps1` on Windows, or `npx intlayer init infra`):

| Setup                 | What it is                                                                      | Pick it for                             |
| --------------------- | ------------------------------------------------------------------------------- | --------------------------------------- |
| **Desktop app**       | Native dashboard for macOS, Linux and Windows                                   | A local client, nothing to host         |
| **All-in-one Docker** | Dashboard, API, MongoDB, Redis and MinIO in a **single container**              | Trials and small single-box installs    |
| **Docker Compose**    | **One container per service**, each datastore replaceable by a managed offering | Production, scaling, managed datastores |

## Table of Contents

<TOC/>

## Published images and packages

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

All three images are built from the same [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) and published on every release. The Compose stack also pulls the official `mongo:8`, `redis:8-alpine` and `quay.io/minio/minio` images.

## Setup

The installer asks which setup you want, checks the prerequisites (offering to install Docker), writes the environment file with the secrets already generated, and pulls the images. It never starts anything on its own: the Docker modes need a mailer first, so it ends by printing the command to run. Re-running it is safe: an existing environment file is never overwritten, which makes it the upgrade path too.

<Tabs group="mode">
<Tab label="Desktop app" value="desktop">

The Intlayer dashboard as a native application, built with Tauri. It signs in to the Intlayer Cloud (`https://app.intlayer.org`), so there is nothing to host. It is the right choice when you want a local client rather than a browser tab.

### Install

The installer downloads the package for your OS and CPU, then opens it (macOS), installs it (`dpkg` / `rpm` on Linux) or launches the setup wizard (Windows). You can also download it by hand from the [releases page](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Requirements

- **Node.js**: the app embeds the dashboard's server and starts it with the machine's own `node` binary. Install it from [nodejs.org](https://nodejs.org) if the app does not start.

> The published desktop build talks to the Intlayer Cloud backend. Pointing it at a self-hosted backend requires rebuilding the app with `VITE_BACKEND_URL` set to your API, see [Limitations](#limitations).

</Tab>
<Tab label="All-in-one Docker" value="docker">

Everything runs inside the single `intlayer/cms-all` container, supervised by [s6-overlay](https://github.com/just-containers/s6-overlay), with every datastore persisted under one volume.

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
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Service     | Host port(s)                  | Purpose                                                  |
| ----------- | ----------------------------- | -------------------------------------------------------- |
| **app**     | `3000`                        | Dashboard (CMS UI)                                       |
| **backend** | `3100`                        | REST API (`/health` endpoint)                            |
| **mongo**   | internal                      | MongoDB 8, single-node replica set `rs0`                 |
| **redis**   | internal                      | Job queues (BullMQ) and caching                          |
| **minio**   | `9000` (S3), `9001` (console) | S3-compatible object storage for avatars and screenshots |

Boot order is enforced by s6 dependencies (`mongod` → replica-set init, `minio` → bucket creation, then `backend`, then `app`), and services restart on exit, so the first boot recovers on its own.

### Prerequisites

- **Docker** ≥ 24: the installer offers to install it (via [get.docker.com](https://get.docker.com) on Linux, Homebrew on macOS). On Windows, install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 backend) first.
- Ports `3000`, `3100`, `9000` and `9001` free on the host. MinIO `9000` must stay reachable by the browser, which loads assets straight from `S3_PUBLIC_URL`.
- A mailer: a [Resend](https://resend.com) API key or an SMTP relay.

### 1. Install

Writes `./intlayer.env` with `BETTER_AUTH_SECRET` and `S3_SECRET_ACCESS_KEY` generated, and pulls `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. Configure a mailer

Open `intlayer.env` and fill in Resend **or** SMTP (details in [Global mailer](#global-mailer)):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Start

This is the command the installer prints:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

The CLI runs the installer, which prints the `docker run …` command shown in the other tabs. Copy it into your terminal once the mailer is configured.

</Tab>
</Tabs>

Open **http://localhost:3000** and follow [First-run setup](#first-run-setup). The first boot initialises the replica set and the bucket, so give it a minute.

### Backup and upgrade

All state lives in the `intlayer-data` volume (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

To upgrade, re-run the installer (it pulls the latest image and keeps `intlayer.env`), then `docker rm -f intlayer` and run the start command again. To use a managed MongoDB instead of the bundled one, set `MONGODB_URI` in `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

One container per service on a private Compose network. The dashboard and the API use the published `intlayer/cms-frontend` and `intlayer/cms-backend` images; the datastores use the official `mongo`, `redis` and `minio` images.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Service      | Image                   | Role                                                                      |
| ------------ | ----------------------- | ------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Dashboard on `:3000`; waits for the backend to be healthy                 |
| `backend`    | `intlayer/cms-backend`  | API on `:3100` with Chromium; waits for Mongo, Redis and the MinIO bucket |
| `mongo`      | `mongo:8`               | Single-node replica set `rs0`, initiated by its own healthcheck           |
| `redis`      | `redis:8-alpine`        | Queues and caching, append-only persistence                               |
| `minio`      | `quay.io/minio/minio`   | S3 storage on `:9000`, console on `:9001`                                 |
| `minio-init` | `quay.io/minio/mc`      | One-shot: creates the bucket and its anonymous-download policy            |

Data is kept in the `intlayer_mongo-data`, `intlayer_redis-data` and `intlayer_minio-data` volumes. The service wiring (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, the internal backend URL used by server-side rendering) is fixed in the compose file and takes precedence over `.env`, which only carries secrets and optional integrations.

### Prerequisites

- **Docker** ≥ 24 with the Compose plugin: the installer offers to install it on Linux and macOS. On Windows, install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 backend) first.
- Ports `3000`, `3100`, `9000` and `9001` free on the host.
- A mailer: a [Resend](https://resend.com) API key or an SMTP relay.

### 1. Install

Writes `docker-compose.yml` and a `.env` with the secrets generated into `./intlayer/`, and pulls the images.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

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

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Configure a mailer

Fill in Resend **or** SMTP in `intlayer/.env`, exactly as for the all-in-one container (see [Global mailer](#global-mailer)).

### 3. Start

```sh
cd intlayer && docker compose up -d
```

Open **http://localhost:3000** and follow [First-run setup](#first-run-setup).

### Managed datastores

Delete the service you are replacing from the compose file (and its `depends_on` entry on `backend`), then override the matching variable:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` keep their meaning against any S3-compatible provider.

### Scaling

`app` and `backend` are stateless. Behind a load balancer, `docker compose up -d --scale backend=3` works once the fixed host port mappings are removed and the proxy addresses the services by name. Background jobs are coordinated through Redis (BullMQ), so several backend replicas share the queue safely.

### Building from source

From a checkout of the repository, an override switches the two Intlayer services from `image:` to `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

This is also how you produce images for a custom domain: pass the `VITE_*` values as build args (see [Limitations](#limitations)).

### Backup and upgrade

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Installer settings

Without `--mode` (or `INTLAYER_MODE`), the installer shows a menu: `desktop`, `docker` (all-in-one) or `compose`. It also reads a few environment variables. Because it is piped into the shell, pass them to the shell rather than to `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> The port variables only change the **host** side of the mapping. The published images have `http://localhost:3000`, `http://localhost:3100` and `http://localhost:9000` compiled into the dashboard bundle, so remapping them leaves the browser pointing at the old ports. Keep the defaults unless you build your own images, see [Limitations](#limitations).

## First-run setup

On a fresh instance (empty database), opening the dashboard redirects you to the **`/init`** page:

1. Create the first account. Because the users collection is empty, this account is automatically promoted to **super admin**.
2. A verification email is sent through Resend or your SMTP relay. Email verification is **mandatory**, this is why a mailer must be configured before you start.
3. Click the link in the email, then sign in.

Once an admin exists, `/init` redirects to the standard sign-in page.

## Environment variables

Both Docker modes read the same file (`intlayer.env` for the container, `.env` for Compose), generated from [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Required

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Fixed by the deployment

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

The Compose `app` service additionally receives `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: the browser reaches the API on `localhost:3100`, but server-side rendering runs inside the Compose network and must use the service name.

### Optional (features degrade gracefully when absent)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Global mailer

Every transactional email, including non-organization emails such as password resets and magic links, goes through one of two global transports:

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

## Limitations

- **No custom domain, and no port remapping.** All browser-facing `VITE_*` URLs are inlined into the dashboard at build time, and the published images (and the desktop app) ship with `localhost` / Intlayer Cloud values. The dashboard must be accessed at `http://localhost:3000`, the API at `:3100` and MinIO at `:9000`. Serving it on a public domain, or pointing the desktop app at a self-hosted backend, requires rebuilding with the target URLs baked in (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` on `docker/selfhost/Dockerfile`, or through `docker-compose.build.yml`) and is not supported out of the box.
- **Email requires a working mailer.** First-run setup enforces email verification, so either `RESEND_API_KEY` or an [SMTP relay](#global-mailer) (`MAIL_SMTP_*`) must be configured. After the first admin signs in, each organization can also configure its own SMTP or Resend mailer from the dashboard.
- **The desktop app needs Node.js** on the machine to start its embedded server.

## Useful links

- [Intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Desktop app releases](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), mirrored on GHCR under `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` and `.env.template`
