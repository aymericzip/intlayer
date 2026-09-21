# Intlayer self-host images

Everything needed to run Intlayer on your own infrastructure, built from one
Dockerfile with three targets:

| Image               | Target       | Contents                                                       | Use it for                               |
| ------------------- | ------------ | -------------------------------------------------------------- | ---------------------------------------- |
| `intlayer-selfhost` | `all-in-one` | app + backend + **MongoDB** + **Redis** + **MinIO** + Chromium | quick trials, single-box installs        |
| `intlayer-app`      | `app`        | dashboard (TanStack Start on Bun)                              | `docker-compose.yml`, Kubernetes, Swarm… |
| `intlayer-backend`  | `backend`    | API (Fastify on Bun) + Chromium                                | `docker-compose.yml`, Kubernetes, Swarm… |

Published on every version bump to `ghcr.io/aymericzip/<image>` (and mirrored on
Docker Hub) by `.github/workflows/selfhost-container-release.yaml`.

- **All-in-one** — one container, one volume, supervised by
  [s6-overlay](https://github.com/just-containers/s6-overlay). Nothing external
  to provision.
- **Compose** — one process per container. Each service can be sized, scaled or
  swapped for a managed offering (Atlas, ElastiCache, S3…) independently.

User-facing guide: [`docs/docs/en/self_hosting.md`](../../docs/docs/en/self_hosting.md).

## Build

The build context must be the **monorepo root**:

```sh
docker build -f docker/selfhost/Dockerfile                    -t intlayer/selfhost .
docker build -f docker/selfhost/Dockerfile --target app       -t intlayer/app .
docker build -f docker/selfhost/Dockerfile --target backend   -t intlayer/backend .
```

The `app-builder` / `backend-builder` stages are shared, so the three builds hit
the same BuildKit cache and compile each app once.

> The browser-facing `VITE_*` values are inlined at **build time** and default to
> `localhost`. Pass `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`
> to target another host — see [Limitations](#limitations).

## Run — all-in-one

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  ghcr.io/aymericzip/intlayer-selfhost
```

Open **http://localhost:3000**. A fresh instance redirects to `/init` to create the
first account, which is promoted to super admin.

`/data` holds every datastore (`/data/mongo`, `/data/redis`, `/data/minio`) —
mount a volume there to persist across container recreation.

Boot order is enforced through s6 dependencies:

```
mongod ─▶ init-mongo (rs.initiate) ─┐
redis ──────────────────────────────┼─▶ backend ─▶ app
minio ──▶ init-minio (bucket) ──────┘
```

Long-running services auto-restart on exit, so the backend recovers if a
datastore is briefly unavailable on first boot.

## Run — Docker Compose

```sh
cd docker/selfhost
cp .env.template .env      # fill in the values marked TODO
docker compose up -d
```

Services: `app`, `backend`, `mongo` (single-node replica set, initiated by its own
healthcheck), `redis`, `minio` + `minio-init` (bucket + anonymous download policy).
Data lives in the `mongo-data`, `redis-data` and `minio-data` volumes.

The service wiring (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`…) is fixed in the
compose file and takes precedence over `.env`; `.env` carries the secrets, the
mailer and the optional integrations.

To build the images from a checkout instead of pulling them:

```sh
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

## Ports

| Port | Service           |
| ---- | ----------------- |
| 3000 | Dashboard (app)   |
| 3100 | API (backend)     |
| 9000 | MinIO S3 endpoint |
| 9001 | MinIO console     |

MinIO `9000` must be reachable by the browser — avatars and screenshots are loaded
straight from `S3_PUBLIC_URL`.

## Configuration

- **Required:** `BETTER_AUTH_SECRET`, `S3_SECRET_ACCESS_KEY`, and a mailer
  (`RESEND_API_KEY`, or `MAIL_SMTP_*` which takes over as soon as
  `MAIL_SMTP_HOST` is set) — first-run setup
  enforces email verification.
- **External datastores:** `MONGODB_URI` (any `mongodb://` or `mongodb+srv://`
  string), `REDIS_URL`, `S3_ENDPOINT` / `S3_PUBLIC_URL` / `S3_ACCESS_KEY_ID`.
- **Optional features (blank ⇒ disabled):** `OPENAI_API_KEY`, OAuth
  (`GITHUB_*`, `GOOGLE_*`, …).

`SELF_HOSTED=true` (API) and `VITE_SELF_HOSTED=true` (dashboard) are baked into the
images and disable the cloud-only features (billing, marketplace, analytics).

## Limitations

- **No custom domain from the published images.** `VITE_*` browser URLs are
  inlined at build time with `localhost` values, so the dashboard must be reached
  at `http://localhost:3000`. Serving it on a public domain requires rebuilding
  the images with the target URLs as build args.
- **Email delivery must work** before the first admin can sign in.
