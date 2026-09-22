# Intlayer self-host images

Everything needed to run Intlayer on your own infrastructure, built from one
Dockerfile with three targets:

| Image          | Target       | Contents                                                         | Use it for                               |
| -------------- | ------------ | ---------------------------------------------------------------- | ---------------------------------------- |
| `cms-all`      | `all-in-one` | app + backend + **MongoDB 8** + **Redis** + **MinIO** + Chromium | quick trials, single-box installs        |
| `cms-frontend` | `app`        | dashboard (TanStack Start on Bun)                                | `docker-compose.yml`, Kubernetes, Swarm… |
| `cms-backend`  | `backend`    | API (Fastify on Bun) + Chromium                                  | `docker-compose.yml`, Kubernetes, Swarm… |

Published on every version bump to Docker Hub as `intlayer/<name>` (mirrored on
GHCR as `ghcr.io/aymericzip/intlayer/<name>`) by
`.github/workflows/selfhost-container-release.yaml`.

Users install either shape through `https://intlayer.org/install.sh` (macOS /
Linux), `install.ps1` (Windows) or `npx intlayer init infra`; both installers
fetch `docker-compose.yml` and `.env.template` from this directory on `main`.

- **All-in-one** — one container, one volume, supervised by
  [s6-overlay](https://github.com/just-containers/s6-overlay). Nothing external
  to provision.
- **Compose** — one process per container. Each service can be sized, scaled or
  swapped for a managed offering (Atlas, ElastiCache, S3…) independently.

User-facing guide: [`docs/docs/en/self_hosting.md`](../../docs/docs/en/self_hosting.md).

## Build

The build context must be the **monorepo root**:

```sh
docker build -f docker/selfhost/Dockerfile                    -t intlayer/cms-all .
docker build -f docker/selfhost/Dockerfile --target app       -t intlayer/cms-frontend .
docker build -f docker/selfhost/Dockerfile --target backend   -t intlayer/cms-backend .
```

The `app-builder` / `backend-builder` stages are shared, so the three builds hit
the same BuildKit cache and compile each app once.

> The browser-facing `VITE_*` values are inlined at **build time** and default to
> `localhost`. Pass `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`
> to target another host. `docker-compose.build.yml` does it from `DOMAIN` /
> `APP_URL` / `BACKEND_URL` in `.env`, and accepts the repository URL as build
> context (`INTLAYER_BUILD_CONTEXT`) so no checkout is needed — see
> [Limitations](#limitations).

## Run — all-in-one

```sh
cp .env.template intlayer.env      # fill in the secrets and a mailer
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all
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
mailer and the optional integrations. The same `.env.template` serves the
all-in-one container (`docker run --env-file`).

`app` gets `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: the browser reaches
the API on `localhost:3100` (compiled into the bundle) but server-side rendering
runs inside the Compose network, where `localhost` is the app container itself.
`@intlayer/api`'s fetcher rewrites server-side requests to that origin.

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
  the images with the target URLs as build args. The backend side is runtime:
  `DOMAIN`, `APP_URL`, `BACKEND_URL` and `S3_PUBLIC_URL` in the env file
  override the localhost defaults in both modes, and the installer writes them
  (plus the build wiring) when asked for a domain.
- **Email delivery must work** before the first admin can sign in.
